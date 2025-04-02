import React, { useRef, useEffect, useState } from 'react';
import { Camera, CameraOff, User, Maximize2, AlertCircle } from 'lucide-react';

interface CameraFeedProps {
  onPersonDetected?: (data: { name: string; age: string; confidence: number }) => void;
}

interface DetectedPerson {
  name: string;
  age: string;
  confidence: number;
  x: number;
  y: number;
}

const CameraFeed: React.FC<CameraFeedProps> = ({ onPersonDetected }) => {
  const [isActive, setIsActive] = useState(false);
  const [detectedPersons, setDetectedPersons] = useState<DetectedPerson[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Cleanup function to ensure camera is stopped when component unmounts
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);
  
  const startCamera = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log("Starting camera access procedure");
      
      // First check if browser supports getUserMedia
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Your browser doesn't support camera access");
      }
      
      // Ensure video element exists
      if (!videoRef.current) {
        console.error("Video element ref is null");
        throw new Error("Camera initialization failed: Video element not found");
      }
      
      // Define camera constraints with fallback options
      const constraints = {
        audio: false,
        video: {
          width: { ideal: 1280, min: 640 },
          height: { ideal: 720, min: 480 },
          facingMode: "user" // Use front camera on mobile devices
        }
      };
      
      console.log("Requesting camera access with constraints:", constraints);
      
      // Request camera access with more specific error handling
      let stream: MediaStream;
      try {
        stream = await navigator.mediaDevices.getUserMedia(constraints);
        console.log("Camera access granted:", stream);
      } catch (err: any) {
        console.error("getUserMedia error:", err);
        if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
          throw new Error("Camera access denied. Please allow camera access in your browser settings.");
        } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
          throw new Error("No camera found on this device.");
        } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
          throw new Error("Camera is already in use by another application.");
        } else {
          throw new Error(`Camera error: ${err.message}`);
        }
      }
      
      // Double-check video element again
      if (!videoRef.current) {
        console.error("Video element disappeared after getUserMedia");
        throw new Error("Camera initialization failed: Video element not available");
      }
      
      // Set up video element with the stream
      videoRef.current.srcObject = stream;
      streamRef.current = stream;
      
      // Wait for video to be ready to play
      console.log("Setting up video element and waiting for metadata");
      try {
        await new Promise<void>((resolve, reject) => {
          if (!videoRef.current) {
            reject("Video element not found");
            return;
          }
          
          const handleMetadataLoaded = () => {
            console.log("Video metadata loaded");
            videoRef.current?.removeEventListener('loadedmetadata', handleMetadataLoaded);
            resolve();
          };
          
          const handleVideoError = (e: Event) => {
            console.error("Video element error:", e);
            videoRef.current?.removeEventListener('error', handleVideoError);
            reject("Video loading error");
          };
          
          videoRef.current.addEventListener('loadedmetadata', handleMetadataLoaded);
          videoRef.current.addEventListener('error', handleVideoError);
          
          // If the video already has metadata, resolve immediately
          if (videoRef.current.readyState >= 1) {
            console.log("Video already has metadata, resolving immediately");
            videoRef.current.removeEventListener('loadedmetadata', handleMetadataLoaded);
            resolve();
          }
        });
      } catch (err) {
        console.error("Error waiting for video metadata:", err);
        throw new Error(`Video setup failed: ${err}`);
      }
      
      console.log("Video metadata loaded, attempting to play");
      
      // Double-check video element again
      if (!videoRef.current) {
        console.error("Video element disappeared before play");
        throw new Error("Camera initialization failed: Video element not available before play");
      }
      
      // Explicitly play the video with better error handling
      try {
        await videoRef.current.play();
        console.log("Video playing successfully");
      } catch (e: any) {
        console.error("Error playing video:", e);
        throw new Error(`Error playing video: ${e.message}`);
      }
      
      setIsActive(true);
      console.log("Camera active state set to true");
      
      // Start frame processing for person detection
      startPersonDetection();
      
    } catch (err: any) {
      console.error('Error accessing camera:', err);
      setError(`${err.message || 'Unknown camera error'}`);
      setIsActive(false);
      // Clean up any partial setup
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    } finally {
      setLoading(false);
    }
  };
  
  const stopCamera = () => {
    console.log("Stopping camera");
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        track.stop();
        console.log("Camera track stopped:", track.label);
      });
      streamRef.current = null;
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
      console.log("Video element source cleared");
    }
    
    setIsActive(false);
    setDetectedPersons([]);
    setError(null);
    console.log("Camera deactivated");
  };
  
  // Simulate person detection with a more robust approach
  const startPersonDetection = () => {
    console.log("Starting simulated person detection");
    // For demo purposes only - in real implementation you'd use a computer vision library
    // like TensorFlow.js or a face detection API
    
    // First person detection
    setTimeout(() => {
      const personData = {
        name: "Mr.Dinesh",
        age: "45",
        confidence: 98,
        x: 50, // percentage from left
        y: 50  // percentage from top
      };
      
      console.log("First person detected:", personData);
      setDetectedPersons([personData]);
      onPersonDetected?.(personData);
      
      // Additional person detection
      setTimeout(() => {
        console.log("Second person detected");
        setDetectedPersons(prevPersons => [
          ...prevPersons,
          {
            name: "Dr.Nirmala",
            age: "34",
            confidence: 92,
            x: 75,
            y: 40
          }
        ]);
      }, 3000);
    }, 2000);
  };

  return (
    <div className="relative bg-gray-800/50 backdrop-blur-sm border border-cyan-900/30 overflow-hidden rounded-lg">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5" />
      <div className="relative aspect-video bg-gray-900/50 flex items-center justify-center overflow-hidden">
        <div className="relative w-full h-full">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={`w-full h-full object-cover ${!isActive ? 'hidden' : ''}`}
          />
          {/* Hidden canvas for video processing */}
          <canvas 
            ref={canvasRef}
            className="hidden"
            width="640"
            height="480"
          />
          
          {isActive && (
            <>
              <div className="absolute inset-0 border border-cyan-500/20" />
              <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-cyan-500/50" />
              <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-cyan-500/50" />
              
              {/* Person detection circles */}
              {detectedPersons.map((person, index) => (
                <div 
                  key={index}
                  className="absolute"
                  style={{
                    left: `${person.x}%`,
                    top: `${person.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  {/* Outer pulsing circle */}
                  <div className="animate-ping absolute w-16 h-16 rounded-full border-2 border-cyan-500/30 opacity-75"></div>
                  
                  {/* Main circle */}
                  <div className="relative w-16 h-16 rounded-full border-2 border-cyan-500 flex items-center justify-center">
                    <div className="absolute top-full mt-2 bg-black/70 px-2 py-1 rounded text-xs text-cyan-400 whitespace-nowrap">
                      {person.name} • {person.confidence}%
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="absolute bottom-4 left-4">
                <div className="bg-cyan-500/20 backdrop-blur-sm rounded-lg p-2 border border-cyan-500/30">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm text-cyan-400">Live Feed</span>
                    {detectedPersons.length > 0 && (
                      <>
                        <div className="w-1 h-1 rounded-full bg-cyan-400"></div>
                        <span className="text-sm text-cyan-400">{detectedPersons.length} detected</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="absolute top-4 right-4 flex space-x-2">
                <div className="rotate-slow w-16 h-16 rounded-full border-2 border-cyan-500/20 flex items-center justify-center">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full" />
                </div>
              </div>
            </>
          )}
          
          {!isActive && (
            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
              <CameraOff className="w-16 h-16 text-gray-600" />
              {error && (
                <div className="text-red-400 text-center max-w-md px-4">
                  {error}
                </div>
              )}
              {!error && (
                <div className="text-gray-400 text-center">
                  Camera is inactive. Click the camera button to start.
                </div>
              )}
            </div>
          )}
          
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900/70">
              <div className="animate-spin w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full"></div>
            </div>
          )}
        </div>
      </div>
      
      <div className="absolute top-4 left-4 space-x-2 flex">
        <button
          onClick={() => isActive ? stopCamera() : startCamera()}
          className={`p-2 rounded transition-all duration-200 ${
            isActive
              ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
              : 'bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30'
          }`}
          disabled={loading}
        >
          <Camera className="w-5 h-5" />
        </button>
        <button className="p-2 rounded bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-all duration-200">
          <Maximize2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default CameraFeed;