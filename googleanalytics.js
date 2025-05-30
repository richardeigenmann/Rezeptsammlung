<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-47341387-3', 'auto');
  ga('send', 'pageview');

    let wakeLock = null; // Variable to hold the wake lock instance
    const statusText = document.getElementById('status');
    const wakeLockToggle = document.getElementById('wakeLockToggle');

    // Function to request a wake lock
    async function requestWakeLock() {
      try {
        wakeLock = await navigator.wakeLock.request('screen');
        //statusText.innerHTML = 'Wake Lock is currently <strong>active</strong>.';

        // Listen for wake lock being released
        wakeLock.addEventListener('release', () => {
          //statusText.innerHTML = 'Wake Lock is currently <strong>inactive</strong>.';
          wakeLockToggle.checked = false; // Update checkbox state
        });

        console.log('Wake Lock activated.');
      } catch (err) {
        console.error(`Failed to acquire wake lock: ${err.message}`);
      }
    }

    // Function to release the wake lock
    function releaseWakeLock() {
      if (wakeLock) {
        wakeLock.release();
        wakeLock = null;
        //statusText.innerHTML = 'Wake Lock is currently <strong>inactive</strong>.';
        console.log('Wake Lock released.');
      }
    }

    // Initialize wake lock on page load
    async function initializeWakeLock() {
      if ('wakeLock' in navigator) {
        await requestWakeLock(); // Enable wake lock by default
      } else {
        //statusText.innerHTML = 'Wake Lock is <strong>not supported</strong> by your browser.';
      }
    }

    // Event listener for the checkbox
    wakeLockToggle.addEventListener('change', () => {
      if (wakeLockToggle.checked) {
        requestWakeLock();
      } else {
        releaseWakeLock();
      }
    });

    // Handle page visibility change
    document.addEventListener('visibilitychange', () => {
      if (wakeLock && document.visibilityState === 'hidden') {
        releaseWakeLock(); // Automatically release wake lock when page is hidden
        wakeLockToggle.checked = false; // Update checkbox state
      }
    });

    // Enable wake lock by default when the page loads
    window.addEventListener('load', initializeWakeLock);
</script>