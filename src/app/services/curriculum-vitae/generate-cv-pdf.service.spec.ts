import { TestBed } from '@angular/core/testing';

import { GenerateCvPdfService } from './generate-cv-pdf.service';

describe('GenerateCvPdfService', () => {
  let service: GenerateCvPdfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerateCvPdfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
