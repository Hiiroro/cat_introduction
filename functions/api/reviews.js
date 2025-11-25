// メモリ上に保存する（ローカル環境だけで動作）
let reviews = [];

export async function onRequest(context) {
  const { request } = context;

  // GET → 全件返す
  if (request.method === "GET") {
    return new Response(JSON.stringify(reviews), {
      headers: { "Content-Type": "application/json" }
    });
  }

  // POST → データ追加
  if (request.method === "POST") {
    const body = await request.json();

    // 送られてきたデータをそのまま保存
    reviews.push({
      ui: body.ui ?? null,
      features: body.features ?? null,
      stability: body.stability ?? null,
      rating: body.rating,
      comment: body.comment,
      time: Date.now()
    });

    return new Response(JSON.stringify({ ok: true }), {
      headers: { "Content-Type": "application/json" }
    });
  }

  return new Response("Method Not Allowed", { status: 405 });
}

