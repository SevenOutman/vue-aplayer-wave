<template>
  <div class="aplayer-wave">
    <canvas ref="canvas" height="30"></canvas>
  </div>
</template>

<script>
  let WIDTH, HEIGHT = 30
  export default {
    name: "vue-aplayer-wave",
    props: ['currentMusic', 'playStat'],
    data() {
      return {
        buffer: [],
      };
    },
    methods: {
      onFrame() {
        requestAnimationFrame(this.onFrame)

        let dataArray = new Uint8Array(this.analyser.frequencyBinCount)
        const bufferLength = this.analyser.frequencyBinCount
        this.analyser.getByteFrequencyData(dataArray)
        // console.log(dataArray)
        // console.log(this.buffer)
        // this.buffer = dataArray
        // this.$forceUpdate()
        const canvasCtx = this.$refs.canvas.getContext('2d')
        canvasCtx.fillStyle = 'rgb(0, 0, 0)';
        canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

        var barWidth = (WIDTH / bufferLength) * 2.5;
        var barHeight;
        var x = 0;

        for (var i = 0; i < bufferLength; i++) {
          barHeight = dataArray[i];

          canvasCtx.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)';
          canvasCtx.fillRect(x, HEIGHT - barHeight / 2 - 2, barWidth, barHeight / 2 + 2);

          x += barWidth + 1;
        }
      },
    },
    mounted() {
      const audioElement = this.$parent.audio;
      const audioCtx = this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const analyser = this.analyser = audioCtx.createAnalyser();

      const source = audioCtx.createMediaElementSource(audioElement);
      source.connect(analyser)
      analyser.connect(audioCtx.destination)

      analyser.fftSize = 256
      WIDTH = this.$refs.canvas.clientWidth
      this.onFrame()
    },
  }
</script>

<style lang="scss">
  .aplayer-wave {
    position: relative;
    height: 30px;
    text-align: center;
    overflow: hidden;
    margin: -10px 0 7px;

    canvas {
      width: 100%;
      height: 100%;
    }
  }
</style>