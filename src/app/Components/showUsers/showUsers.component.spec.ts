/* tslint:disable:no-unused-variable */
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ShowUsersComponent } from './showUsers.component';
import { UsersService } from '../../Services/users.service';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';

describe('ShowUsersComponent', () => {
  let component: ShowUsersComponent;
  let fixture: ComponentFixture<ShowUsersComponent>;
  let mockUserService: any;

  beforeEach(waitForAsync(() => {
    // Mock UsersService
    mockUserService = {
      getAllUsers: jasmine.createSpy('getAllUsers').and.returnValue(
        of({
          result: true,
          data: [
            {
              firstName: 'John',
              lastName: 'Doe',
              mobileNo: '123456789',
              emailId: 'john@example.com',
            },
          ],
        })
      ),
    };

    TestBed.configureTestingModule({
      imports: [CommonModule], // For *ngIf and *ngFor
      declarations: [ShowUsersComponent],
      providers: [{ provide: UsersService, useValue: mockUserService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load users', () => {
    expect(component.allUsers.length).toBe(1);
    expect(component.allUsers[0].firstName).toBe('John');
  });

  it('should show loader while loading', () => {
    component.isLoading = true;
    fixture.detectChanges();
    const loaderEl = fixture.debugElement.query(By.css('.loader'));
    expect(loaderEl).toBeTruthy();
  });
});
