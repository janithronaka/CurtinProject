import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class AdmissionService {

  constructor (private http: HttpClient) {}

  getAllAdmissions() {
    return this.http.get('/api/admission/all');
  }

  getAdmission(id: string) {
    return this.http.get('/api/admission/' + id);
  }

  addNewAdmission(formData: any) {
    this.http.post<{ status: any, message: any }>('/api/admission',
                                                  formData).subscribe();
  }

  updateAdmission(updateData: any) {
    console.log(updateData);
    this.http.put<{ status: any, message: any }>('/api/admission/',
    updateData).subscribe();
  }

  deleteAdmission(admissionId: any) {
    this.http.delete('/api/admission/' + admissionId).subscribe();
  }
}
