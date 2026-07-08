function setCookie(name, value, days = 30) {
  const expires = new Date();

  expires.setTime(
    expires.getTime() + (days * 24 * 60 * 60 * 1000)
  );

  document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
}

function encodeBase64(value) {
  return btoa(
    String.fromCharCode(...new TextEncoder().encode(value))
  );
}

function handleAppointmentClick(event) {
  const link = event.target.closest(
    'a[data-eds-request-appointment]'
  );

  if (!link?.href) {
    return;
  }

  setCookie('appointmentTarget', encodeBase64(link.href), 1);
}

export function initAppointmentTracking() {
  document.body.addEventListener(
    'click',
    handleAppointmentClick
  );
}