import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokTeamComponent } from './pok-team.component';

describe('PokTeamComponent', () => {
  let component: PokTeamComponent;
  let fixture: ComponentFixture<PokTeamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokTeamComponent]
    });
    fixture = TestBed.createComponent(PokTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
