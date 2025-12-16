import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectTo } from './redirect-to';

describe('RedirectTo', () => {
  let component: RedirectTo;
  let fixture: ComponentFixture<RedirectTo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RedirectTo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedirectTo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
