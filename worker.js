export class UserSaveRoom {
  constructor(state, env) {
    this.state = state;
  }

  async fetch(request) {
    if (request.method === 'GET') {
      const data = await this.state.storage.get('save_record');
      return Response.json(data || {});
    }

    if (request.method === 'POST') {
      try {
        const body = await request.json();
        const record = {
          user_id: body.user_id,
          user_name: body.user_name || 'ハンター',
          max_stage: Number(body.max_stage) || 1,
          max_floor: Number(body.max_floor) || 1,
          save_json: body.save_json,
          updated_at: new Date().toISOString()
        };
        await this.state.storage.put('save_record', record);
        return Response.json({ ok: true });
      } catch (e) {
        return Response.json({ error: e.message }, { status: 400 });
      }
    }

    return new Response('Method Not Allowed', { status: 405 });
  }
}

export default {
  async fetch(request, env) {
    return new Response('UserSaveRoom DO Worker is running.');
  }
};