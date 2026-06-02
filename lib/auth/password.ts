export function calculatePasswordScore(password: string): number {
  if (!password) {
    return 0;
  }

  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  return Math.min(score, 4);
}

export function getPasswordStrengthLabel(score: number) {
  if (score <= 1) return "Weak";
  if (score <= 2) return "Fair";
  if (score === 3) return "Good";
  return "Strong";
}
