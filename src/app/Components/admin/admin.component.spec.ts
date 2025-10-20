import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { AdminComponent } from './admin.component';
import { UsersService } from '../../Services/users.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let mockUserService: any;

  beforeEach(waitForAsync(() => {
    mockUserService = {
      getAllUsers: jasmine.createSpy('getAllUsers').and.returnValue(
        of({
          result: true,
          data: [
            {
              userId: 1,
              firstName: 'John',
              lastName: 'Doe',
              mobileNo: '123456789',
              emailId: 'john@example.com',
            },
          ],
        })
      ),
      deleteUser: jasmine
        .createSpy('deleteUser')
        .and.returnValue(of({ result: true, message: 'Deleted successfully' })),
    };

    TestBed.configureTestingModule({
      imports: [RouterTestingModule, CommonModule], // <-- added RouterTestingModule for routerLink
      declarations: [AdminComponent],
      providers: [{ provide: UsersService, useValue: mockUserService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
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
