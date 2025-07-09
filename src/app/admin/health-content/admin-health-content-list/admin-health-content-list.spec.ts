import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHealthContentList } from './admin-health-content-list';

describe('AdminHealthContentList', () => {
  let component: AdminHealthContentList;
  let fixture: ComponentFixture<AdminHealthContentList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminHealthContentList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminHealthContentList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
