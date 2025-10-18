// Show/Hide Address Form
const showAddressBtn = document.getElementById('showAddressBtn');
const addrForm = document.getElementById('addrForm');
const pwForm = document.getElementById('pwForm');

showAddressBtn.addEventListener('click', () => {
  pwForm.classList.add('hidden');
  addrForm.classList.remove('hidden');
});

function hideAddressForm() {
  addrForm.classList.add('hidden');
  pwForm.classList.remove('hidden');
}

// Back button (page-level)
function goBack() {
  if (document.referrer) {
    window.history.back();
  } else {
    window.location.href = "index.html";
  }
}

/* ---------- PASSWORD FORM VALIDATION ---------- */
const msg = document.getElementById('message');
const errCurrent = document.getElementById('err-current');
const errNew = document.getElementById('err-new');
const errConfirm = document.getElementById('err-confirm');

function validatePassword(pw) {
  if (pw.length < 9) return { ok: false, reason: 'Minimum 9 characters required.' };
  const upper = pw.match(/[A-Z]/g) || [];
  if (upper.length !== 2) return { ok: false, reason: 'Exactly 2 uppercase letters required.' };
  const special = pw.match(/[!@#$%^&*()]/g) || [];
  if (special.length < 1) return { ok: false, reason: 'At least 1 special character (!@#$%^&*()).' };
  return { ok: true };
}

pwForm.addEventListener('input', e => {
  const { id, value } = e.target;

  if (id === 'newpw') {
    const result = validatePassword(value);
    errNew.textContent = result.ok ? '' : result.reason;
  }

  if (id === 'confirm') {
    const newpw = pwForm.newpw.value;
    errConfirm.textContent = newpw === value ? '' : 'Passwords do not match.';
  }
});

pwForm.addEventListener('submit', e => {
  e.preventDefault();

  msg.textContent = '';
  msg.className = 'message';
  errCurrent.textContent = '';
  errNew.textContent = '';
  errConfirm.textContent = '';

  const current = pwForm.current.value.trim();
  const newpw = pwForm.newpw.value.trim();
  const confirm = pwForm.confirm.value.trim();

  if (!current) {
    errCurrent.textContent = 'Enter your current password.';
    return;
  }

  const v = validatePassword(newpw);
  if (!v.ok) {
    errNew.textContent = v.reason;
    return;
  }

  if (newpw !== confirm) {
    errConfirm.textContent = 'Passwords do not match.';
    return;
  }

  msg.textContent = '✅ Password changed successfully (demo).';
  msg.classList.add('success');
  pwForm.reset();
});

/* ---------- ADDRESS FORM VALIDATION ---------- */
const addrMsg = document.getElementById('addr-message');

addrForm.addEventListener('submit', e => {
  e.preventDefault();

  const street = addrForm.street.value.trim();
  const city = addrForm.city.value.trim();
  const zip = addrForm.zip.value.trim();

  document.getElementById('err-street').textContent = '';
  document.getElementById('err-city').textContent = '';
  document.getElementById('err-zip').textContent = '';
  addrMsg.textContent = '';
  addrMsg.className = 'message';

  let hasError = false;

  if (!street) {
    document.getElementById('err-street').textContent = 'Enter your street.';
    hasError = true;
  }

  if (!city) {
    document.getElementById('err-city').textContent = 'Enter your city.';
    hasError = true;
  }

  if (!zip.match(/^\d{5}$/)) {
    document.getElementById('err-zip').textContent = 'Enter a valid 5-digit ZIP code.';
    hasError = true;
  }

  if (hasError) return;

  addrMsg.textContent = '✅ Address updated successfully (demo).';
  addrMsg.classList.add('success');
  addrForm.reset();
});
