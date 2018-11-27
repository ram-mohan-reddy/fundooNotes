import { TestBed } from '@angular/core/testing';

import { DataSharingService } from './data-sharing.service';

describe('DataSharingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataSharingService = TestBed.get(DataSharingService);
    expect(service).toBeTruthy();
  }); 

  // it('should receive string from observable', () => {
  //   const service: DataSharingService = TestBed.get(DataSharingService);
  //   service.changeMessage('ram')
  //   expect(service.currentMessage).toBe('ram');
  // }); 

  // it('should receive error message from error service', () => {
  //   const service: DataSharingService = TestBed.get(DataSharingService);
  //   service.errorChangeMessage('error')
  //   expect(service.errorMessage).toBe('error');
  // });

  // it('should receive boolean value on event trigger', () => {
  //   const service: DataSharingService = TestBed.get(DataSharingService);
  //   service.eventTrigger(true)
  //   expect(service.eventEmitted).toBe(true);
  //   expect(service.eventEmitted).not.toBe(false);
  // });

  // it('should receive boolean value on list event trigger', () => {
  //   const service: DataSharingService = TestBed.get(DataSharingService);
  //   service.listEventTrigger(true)
  //   expect(service.listEventEmitted).toBe(true);
  //   expect(service.listEventEmitted).not.toBe(false);
  // });

  // it('should receive string to change on navigation title', () => {
  //   const service: DataSharingService = TestBed.get(DataSharingService);
  //   service.changeIdentityEventTrigger('notes')
  //   expect(service.identityEventEmitted).toBe('notes');
  // });
});
