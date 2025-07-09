import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHealthContentForm } from './admin-health-content-form';

describe('AdminHealthContentForm', () => {
  let component: AdminHealthContentForm;
  let fixture: ComponentFixture<AdminHealthContentForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminHealthContentForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminHealthContentForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
