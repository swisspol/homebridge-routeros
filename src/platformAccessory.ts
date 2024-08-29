import type {
  CharacteristicValue,
  PlatformAccessory,
  Service,
} from 'homebridge';

import type { ExampleHomebridgePlatform } from './platform.js';

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

  getRule() {
    this.platform.log.debug('Triggered getRule');
    // TODO
    return false;
  }

  setRule(value: CharacteristicValue) {
    this.platform.log.debug('Triggered setRule');
    const on = value as boolean;
    this.platform.log.info(
      'HIT',
      this.platform.config.ip_address,
      this.platform.config.user,
      this.platform.config.password,
      this.platform.config.rule,
      on,
    );
  }
}
