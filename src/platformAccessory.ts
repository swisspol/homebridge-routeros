import type {
  CharacteristicValue,
  PlatformAccessory,
  Service,
} from 'homebridge';

import type { ExampleHomebridgePlatform } from './platform.js';

import { RouterOSAPI } from 'node-routeros';

export class ExamplePlatformAccessory {
  private rule: Service;

  constructor(
    private readonly platform: ExampleHomebridgePlatform,
    private readonly accessory: PlatformAccessory,
  ) {
    this.accessory
      .getService(this.platform.Service.AccessoryInformation)!
      .setCharacteristic(this.platform.Characteristic.Manufacturer, 'Mikrotik')
      .setCharacteristic(this.platform.Characteristic.Model, 'N/A')
      .setCharacteristic(this.platform.Characteristic.SerialNumber, 'N/A');

    this.rule =
      this.accessory.getService('Rule') ||
      this.accessory.addService(this.platform.Service.Switch, 'Rule', 'rule');
    this.rule
      .getCharacteristic(this.platform.Characteristic.On)
      .onGet(this.getRule.bind(this))
      .onSet(this.setRule.bind(this));
  }

  logError(error: unknown) {
    if (error instanceof Error) {
      this.platform.log.error(error.name, error.message);
    } else if (typeof error === 'string') {
      this.platform.log.error(error);
    } else {
      this.platform.log.error(typeof error);
    }
  }

  async getRule(): Promise<boolean> {
    this.platform.log.debug('Triggered getRule');

    const result = false;
    const connection = new RouterOSAPI({
      host: this.platform.config.ip_address,
      user: this.platform.config.user,
      password: this.platform.config.password,
    });
    try {
      await connection.connect();
      const rules = await connection.write('/ip/firewall/nat/print');
      this.platform.log.info('OUTPUT', rules);
    } catch (error) {
      this.logError(error);
    } finally {
      connection.close();
    }
    return result;
  }

  async setRule(value: CharacteristicValue): Promise<void> {
    this.platform.log.debug('Triggered setRule');
    const on = value as boolean;
    this.platform.log.info('HIT', on);
  }
}
