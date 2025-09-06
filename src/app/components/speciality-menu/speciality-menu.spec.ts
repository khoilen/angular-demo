import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialityMenu } from './speciality-menu';

describe('SpecialityMenu', () => {
  let component: SpecialityMenu;
  let fixture: ComponentFixture<SpecialityMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialityMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialityMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
