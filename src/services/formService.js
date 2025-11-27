export const FORM_ENDPOINT = 'https://formcarry.com/s/0VNi-UehV3I'; // используете formcarry

export async function sendFeedback(data) {
  const res = await fetch(FORM_ENDPOINT, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
    mode: 'cors'
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Ошибка отправки: ${res.status} ${text}`);
  }

  // formcarry возвращает JSON, пробуем распарсить
  try {
    return await res.json();
  } catch (e) {
    return {};
  }
}
