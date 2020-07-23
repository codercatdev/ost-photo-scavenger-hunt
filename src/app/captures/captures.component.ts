import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy, Output } from '@angular/core';
// import * as mobilenet from '@tensorflow-models/mobilenet';
// import * as tf from '@tensorflow/tfjs';
import * as faceapi from 'face-api.js';
import { Observable, BehaviorSubject, from, Subscription } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'app-captures',
  templateUrl: './captures.component.html',
  styles: [`
    button{
      white-space: pre-wrap;
    }
  `]
})
export class CapturesComponent implements AfterViewInit, OnDestroy {
  private DEFAULT_VIDEO_OPTIONS: MediaTrackConstraints = { facingMode: 'environment' };

  @ViewChild('video') video: ElementRef;
  @Output() expressions = new BehaviorSubject([]);

  videoOptions: MediaTrackConstraints = this.DEFAULT_VIDEO_OPTIONS;
  public mirrorImage: string | WebcamMirrorProperties;
  public availableVideoInputs: MediaDeviceInfo[] = [];

  public videoInitialized = false;
  private triggerSubscription: Subscription;
  private activeVideoInputIndex = -1;
  private switchCameraSubscription: Subscription;
  private mediaStream: MediaStream = null;
  /** width and height of the active video stream */
  private activeVideoSettings: MediaTrackSettings = null;
  private _MINCONF = 0.5;

  model: any;
  predictions: any;
  inputs$: Observable<MediaDeviceInfo[]>;
  loading$ = new BehaviorSubject<boolean>(true);
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) {  }

  ngAfterViewInit(): void {
    this.detectAvailableDevices()
      .then(() => {
        // start video
        this.switchToVideoInput(null);
      })
      .catch((err: string) => {
        // this.initError.next(<WebcamInitError>{ message: err });
        // fallback: still try to load webcam, even if device enumeration failed
        this.switchToVideoInput(null);
      });
  }

  ngOnDestroy(): void {
    this.stopMediaTracks();
    this.unsubscribeFromSubscriptions();
  }

  private getMediaConstraintsForDevice(deviceId: string, baseMediaTrackConstraints: MediaTrackConstraints): MediaTrackConstraints {
    const result: MediaTrackConstraints = baseMediaTrackConstraints ? baseMediaTrackConstraints : this.DEFAULT_VIDEO_OPTIONS;
    if (deviceId) {
      result.deviceId = { exact: deviceId };
    }

    return result;
  }
  private getDeviceIdFromMediaStreamTrack(mediaStreamTrack: MediaStreamTrack): string {
    if (mediaStreamTrack.getSettings && mediaStreamTrack.getSettings() && mediaStreamTrack.getSettings().deviceId) {
      return mediaStreamTrack.getSettings().deviceId;
    } else if (mediaStreamTrack.getConstraints && mediaStreamTrack.getConstraints() && mediaStreamTrack.getConstraints().deviceId) {
      const deviceIdObj: ConstrainDOMString = mediaStreamTrack.getConstraints().deviceId;
      return this.getValueFromConstrainDOMString(deviceIdObj);
    }
  }
  private getFacingModeFromMediaStreamTrack(mediaStreamTrack: MediaStreamTrack): string {
    if (mediaStreamTrack) {
      if (mediaStreamTrack.getSettings && mediaStreamTrack.getSettings() && mediaStreamTrack.getSettings().facingMode) {
        return mediaStreamTrack.getSettings().facingMode;
      } else if (mediaStreamTrack.getConstraints && mediaStreamTrack.getConstraints() && mediaStreamTrack.getConstraints().facingMode) {
        const facingModeConstraint: ConstrainDOMString = mediaStreamTrack.getConstraints().facingMode;
        return this.getValueFromConstrainDOMString(facingModeConstraint);
      }
    }
  }
  private isUserFacing(mediaStreamTrack: MediaStreamTrack): boolean {
    const facingMode: string = this.getFacingModeFromMediaStreamTrack(mediaStreamTrack);
    return facingMode ? 'user' === facingMode.toLowerCase() : false;
  }
  private getValueFromConstrainDOMString(constrainDOMString: ConstrainDOMString): string {
    if (constrainDOMString) {
      if (constrainDOMString instanceof String) {
        return String(constrainDOMString);
      } else if (Array.isArray(constrainDOMString) && Array(constrainDOMString).length > 0) {
        return String(constrainDOMString[0]);
      } else if (typeof constrainDOMString === 'object') {
        if ((constrainDOMString as ConstrainDOMStringParameters).exact) {
          return String((constrainDOMString as ConstrainDOMStringParameters).exact);
        } else if ((constrainDOMString as ConstrainDOMStringParameters).ideal) {
          return String((constrainDOMString as ConstrainDOMStringParameters).ideal);
        }
      }
    }

    return null;
  }



  getAvailableVideoInputs(): Promise<MediaDeviceInfo[]> {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      return Promise.reject('enumerateDevices() not supported.');
    }

    return new Promise((resolve, reject) => {
      navigator.mediaDevices.enumerateDevices()
        .then((devices: MediaDeviceInfo[]) => {
          resolve(devices.filter((device: MediaDeviceInfo) => device.kind === 'videoinput'));
        })
        .catch(err => {
          reject(err.message || err);
        });
    });
  }



  public rotateVideoInput(forward: boolean): void {
    if (this.availableVideoInputs && this.availableVideoInputs.length > 1) {
      const increment: number = forward ? 1 : (this.availableVideoInputs.length - 1);
      const nextInputIndex = (this.activeVideoInputIndex + increment) % this.availableVideoInputs.length;
      this.switchToVideoInput(this.availableVideoInputs[nextInputIndex].deviceId);
    }
  }

  public switchToVideoInput(deviceId: string): void {
    this.videoInitialized = false;
    this.stopMediaTracks();
    this.initWebcam(deviceId, this.videoOptions);
  }


  public get nativeVideoElement(): any {
    return this.video.nativeElement;
  }

  private initWebcam(deviceId: string, userVideoTrackConstraints: MediaTrackConstraints): void {
    const vid = this.nativeVideoElement;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {

      // merge deviceId -> userVideoTrackConstraints
      const videoTrackConstraints = this.getMediaConstraintsForDevice(deviceId, userVideoTrackConstraints);

      navigator.mediaDevices.getUserMedia({ video: videoTrackConstraints } as MediaStreamConstraints)
        .then(async (stream: MediaStream) => {
          this.mediaStream = stream;
          vid.srcObject = stream;
          vid.play();

          const MODEL_URL = '/assets/models/';
          await faceapi.loadSsdMobilenetv1Model(MODEL_URL);
          // await faceapi.loadFaceLandmarkModel(MODEL_URL);
          await faceapi.loadFaceExpressionModel(MODEL_URL);

          setInterval(async () => {
            const result = await faceapi.detectAllFaces(
              this.video.nativeElement, new faceapi.SsdMobilenetv1Options({minConfidence: this._MINCONF}))
              .withFaceExpressions();
            this.loading$.next(false);
            this.expressions.next(result
              .map((r) => {
                if (r.detection.score > this._MINCONF) {
                  return Object.keys(r.expressions).reduce((a, b) =>
                    r.expressions[a] > r.expressions[b] ? a : b
                  );
                }
              }));
          }, 500);

          this.activeVideoSettings = stream.getVideoTracks()[0].getSettings();
          const activeDeviceId: string = this.getDeviceIdFromMediaStreamTrack(stream.getVideoTracks()[0]);

          // Initial detect may run before user gave permissions, returning no deviceIds. This prevents later camera switches. (#47)
          // Run detect once again within getUserMedia callback, to make sure this time we have permissions and get deviceIds.
          this.detectAvailableDevices()
            .then(() => {
              this.activeVideoInputIndex = activeDeviceId ? this.availableVideoInputs
                .findIndex((mediaDeviceInfo: MediaDeviceInfo) => mediaDeviceInfo.deviceId === activeDeviceId) : -1;
              this.videoInitialized = true;
            })
            .catch(() => {
              this.activeVideoInputIndex = -1;
              this.videoInitialized = true;
            });
        })
        .catch((err: MediaStreamError) => {
          // this.initError.next({ message: err.message, mediaStreamError: err } as WebcamInitError);
        });
    } else {
      // this.initError.next({ message: 'Cannot read UserMedia from MediaDevices.' } as WebcamInitError);
    }
  }

  private getActiveVideoTrack(): MediaStreamTrack {
    return this.mediaStream ? this.mediaStream.getVideoTracks()[0] : null;
  }

  private isMirrorImage(): boolean {
    if (!this.getActiveVideoTrack()) {
      return false;
    }

    // check for explicit mirror override parameter
    {
      let mirror = 'auto';
      if (this.mirrorImage) {
        if (typeof this.mirrorImage === 'string') {
          mirror = String(this.mirrorImage).toLowerCase();
        } else {
          // WebcamMirrorProperties
          if (this.mirrorImage.x) {
            mirror = this.mirrorImage.x.toLowerCase();
          }
        }
      }

      switch (mirror) {
        case 'always':
          return true;
        case 'never':
          return false;
      }
    }

    // default: enable mirroring if webcam is user facing
    return this.isUserFacing(this.getActiveVideoTrack());
  }


  private stopMediaTracks(): void {
    if (this.mediaStream && this.mediaStream.getTracks) {
      // getTracks() returns all media tracks (video+audio)
      this.mediaStream.getTracks()
        .forEach((track: MediaStreamTrack) => track.stop());
    }
  }

  private unsubscribeFromSubscriptions(): void {
    if (this.triggerSubscription) {
      this.triggerSubscription.unsubscribe();
    }
    if (this.switchCameraSubscription) {
      this.switchCameraSubscription.unsubscribe();
    }
  }

  private detectAvailableDevices(): Promise<MediaDeviceInfo[]> {
    return new Promise((resolve, reject) => {
      this.getAvailableVideoInputs()
        .then((devices: MediaDeviceInfo[]) => {
          this.availableVideoInputs = devices;
          resolve(devices);
        })
        .catch(err => {
          this.availableVideoInputs = [];
          reject(err);
        });
    });
  }

}
export class WebcamMirrorProperties {
  public x: string;  // ["auto", "always", "never"]
}
