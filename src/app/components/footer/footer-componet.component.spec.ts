import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponetComponent } from './footer-componet.component';

describe('FooterComponetComponent', () => {
  let component: FooterComponetComponent;
  let fixture: ComponentFixture<FooterComponetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FooterComponetComponent]
    });
    fixture = TestBed.createComponent(FooterComponetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
