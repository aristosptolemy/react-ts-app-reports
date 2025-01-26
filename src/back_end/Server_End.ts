//const URL_STRING = 'https://aristos-fastapi-app-568113263211.asia-northeast1.run.app';
export default function main() {};

export const Test = async () => {
  const URL_STRING = "https://aristos-fastapi-app-568113263211.asia-northeast1.run.app/items/"; // エンドポイント修正
  try {
    const response = await fetch(
      URL_STRING,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // 必須: JSON形式で送信することを指定
        },
        body: JSON.stringify({
          name: "item1",
          description: "A test item",
          price: 10.5,
          tax: 0.8,
        }),
      },
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    console.log(result);
    return result;
  } catch (e) {
    console.error(e);
    return e;
  }
};

export const LoginTest = async (
  name: string,
  password: string
) => {
  const URL_STRING = "https://aristos-fastapi-app-568113263211.asia-northeast1.run.app/login/"; // エンドポイント修正
  try {
    const response = await fetch(
      URL_STRING,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // 必須: JSON形式で送信することを指定
        },
        body: JSON.stringify({
          account_name: name,
          password: password,
        }),
      },
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    console.log(result);
    return result;
  } catch (e) {
    console.error(e);
    return e;
  }
};