import nats, { Stan } from 'node-nats-streaming';

class NatsWrapper {
  private _client?: Stan;

  //   To be used in implementation
  get client() {
    if (!this._client) {
      throw new Error('Cannot access NATS client before connectingg');
    }

    return this._client;
  }

  connect(clusterId: string, clientId: string, url: string) {
    this._client = nats.connect(clusterId, clientId, { url });

    return new Promise<void>((resolve, reject) => {
      this.client.on('connect', () => {
        console.log('Connected to NATS');
        resolve();
      });

      this.client!.on('error', (err) => {
        reject(err);
      });
    });
  }
}

// Export 1 single instance to share across the files
export const natsWrapper = new NatsWrapper();
