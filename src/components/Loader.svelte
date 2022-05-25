<script>
export let color = '#222d3d';
export let size = '1.5rem';
</script>

<svg
  class="loader"
  width="{size}"
  height="{size}"
  viewBox="0 0 100 100"
  preserveAspectRatio="xMidYMid"
>
  <circle
    cx="50"
    cy="50"
    fill="none"
    stroke="{color}"
    stroke-width="0.5rem"
    r="24"
    stroke-dasharray="113.09733552923255 39.69911184307752"
  >
    <animateTransform
      attributeName="transform"
      type="rotate"
      repeatCount="indefinite"
      dur="1s"
      values="0 50 50;360 50 50"
      keyTimes="0;1"></animateTransform>
  </circle>
</svg>
