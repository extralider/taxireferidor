import { APPS_SCRIPT_URL } from '../constants';
import { ReferralData } from '../types';

export const submitReferral = async (data: ReferralData): Promise<boolean> => {
  try {
    // We use no-cors because Google Apps Script web apps usually don't send CORS headers
    // that satisfy strictly typed fetch requests from different origins.
    // Ideally, the Apps Script should return JSONP or handle CORS, but for this demo
    // 'no-cors' allows the request to be sent (opaque response).
    await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    // Since response is opaque in no-cors, we assume success if no network error was thrown.
    return true;
  } catch (error) {
    console.error('Error submitting referral:', error);
    return false;
  }
};