import { inject, injectable } from 'inversify';
import "reflect-metadata";

// import { PubSub } from "graphql-subscriptions";
import { PubSub } from 'graphql-subscriptions';

export interface IPubSubService {  
  broadcast(key: string, payload: any);
  subscribe(key: string): AsyncIterator<unknown, any, undefined>;
}

@injectable()
export default class PubSubService implements IPubSubService {
  private pubsub: PubSub;

  public constructor() {
    // this.pubsub = new PubSub();
    this.pubsub = new PubSub();
  }

  broadcast(key: string, payload: any) {
    this.pubsub.publish(key, payload);
  }

  subscribe(key: string) { 
    return this.pubsub.asyncIterator(key);
  }
}
