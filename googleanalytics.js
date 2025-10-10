<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PHL53P" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->

<script>
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