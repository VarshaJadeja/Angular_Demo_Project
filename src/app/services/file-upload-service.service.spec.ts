import { TestBed } from '@angular/core/testing';

import { FileUploadService } from './file-upload-service.service';
import { HttpClientModule } from '@angular/common/http';

describe('FileUploadService', () => {
  let service: FileUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule]
    });
    service = TestBed.inject(FileUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
