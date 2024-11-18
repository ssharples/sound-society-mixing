import WaveSurfer from 'wavesurfer.js';

export interface AudioMetrics {
  peakLevel: number;
  averageLevel: number;
  dynamicRange: number;
  clippingPoints: number;
  duration: number;
}

export const analyzeAudio = async (url: string): Promise<AudioMetrics> => {
  return new Promise((resolve, reject) => {
    const wavesurfer = WaveSurfer.create({
      container: document.createElement('div'),
      waveColor: '#fff',
      backend: 'WebAudio'
    });

    wavesurfer.load(url);

    wavesurfer.on('ready', () => {
      const audioBuffer = wavesurfer.getDecodedData();
      if (!audioBuffer) {
        reject(new Error('Failed to decode audio data'));
        return;
      }

      const channelData = audioBuffer.getChannelData(0);
      const sampleRate = audioBuffer.sampleRate;
      
      // Calculate audio metrics
      let peak = 0;
      let sum = 0;
      let clippingCount = 0;
      const clippingThreshold = 0.99;

      for (let i = 0; i < channelData.length; i++) {
        const absolute = Math.abs(channelData[i]);
        peak = Math.max(peak, absolute);
        sum += absolute;
        
        if (absolute >= clippingThreshold) {
          clippingCount++;
        }
      }

      const average = sum / channelData.length;
      const dynamicRange = 20 * Math.log10(peak / average);

      const metrics: AudioMetrics = {
        peakLevel: peak,
        averageLevel: average,
        dynamicRange: dynamicRange,
        clippingPoints: clippingCount,
        duration: audioBuffer.duration
      };

      wavesurfer.destroy();
      resolve(metrics);
    });

    wavesurfer.on('error', reject);
  });
};