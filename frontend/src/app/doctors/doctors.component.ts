import { Component, OnInit } from '@angular/core';
import { DoctorModalComponent } from '../doctor-modal/doctor-modal.component';
import { RpcService } from '../services/rpc.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss']
})
export class DoctorsComponent implements OnInit {

  doctorInfo: any;
  specialitiesInfo: any;
  editMode = false;
  idToEdit: any;
  specialityID: any;
  idConvert = 0;
  displayedColumns = ['lastName', 'firstName', 'calification', 'specialization', 'phoneNumber', 'email', 'button'];

  medicalSpeciality: any;
  lastName = '';
  firstName = '';
  cnp = '';
  birthDate = '';
  sex = '';
  phoneNumber = '';
  email = '';
  county = '';
  city = '';
  street = '';
  streetNumber = '';
  doctorType = '';
  hiringDate = '';
  startSchedule = '';
  endSchedule = '';


  constructor(
    private rpcService: RpcService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getDoctors();
  }

  getDoctors(): void {
    let params = {
      "username": 'admin'
    }

    this.rpcService.callRPC('doctors.createDoctorsTable', params, (err: any, res: any) => {

      if (err || res.error) {
        console.log('nu s-au putut afisa doctorii');
        return;
      }
      this.doctorInfo = res.result;
      console.log(this.doctorInfo);
    });
  }

  deleteDoctor(id: any): void {
    if (!id) {
      console.log('id was not introduced');
      return;
    }

    let paramsDelete = {
      id: id,
    };

    console.log(paramsDelete);

    this.rpcService.callRPC(
      'doctors.deleteDoctor',
      paramsDelete,
      (error: any, res: any) => {
        console.log('intra aici');
        if (error) {
          console.log(error);
          return;
        }
        this.getDoctors();
      }
    );
  }

  addDoctor(): void {
    const dialogRef = this.dialog.open(DoctorModalComponent, {
      data: {
        medicalSpeciality: this.medicalSpeciality,
        lastName: this.lastName,
        firstName: this.firstName,
        cnp: this.cnp,
        birthDate: this.birthDate,
        sex: this.sex,
        phoneNumber: this.phoneNumber,
        email: this.email,
        county: this.county,
        city: this.city,
        street: this.street,
        streetNumber: this.streetNumber,
        DoctorType: this.doctorType,
        hiringDate: this.hiringDate,
        startSchedule: this.startSchedule,
        endSchedule: this.endSchedule
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (!result) {
        console.log('doctor was not introduced');
        return;
      }

      let paramsAddDoctor = {
        medicalSpeciality: result.medicalSpeciality,
        lastName: result.lastName,
        firstName: result.firstName,
        cnp: result.cnp,
        birthDate: result.birthDate,
        sex: result.sex,
        phoneNumber: result.phoneNumber,
        email: result.email,
        county: result.county,
        city: result.city,
        street: result.street,
        streetNumber: result.streetNumber,
        DoctorType: result.doctorType,
        hiringDate: result.hiringDate,
        startSchedule: result.startSchedule,
        endSchedule: result.endSchedule
      };

      console.log(paramsAddDoctor);

      this.rpcService.callRPC(
        'doctors.addDoctor',
        paramsAddDoctor,
        (error: any, res: any) => {
          console.log('intra aici');
          if (error) {
            console.log(error);
            return;
          }
          this.getDoctors();
        }
      );
    });
  }

  editDoctor(id: any): void {
    this.editMode = true;
    this.idToEdit = id;
  }

  saveNewDoctor(element: any): void {
    console.log('s-a apasat butonul de save');
    console.log(element);
    console.log(element.Name);

    let paramsGetSpeciatilyName = {
      name: element.Name,
    };

    this.rpcService.callRPC(
      'specialities.getSpecialityName',
      paramsGetSpeciatilyName,
      (error: any, res: any) => {
        console.log('intra in getSpecialityName');
        if (error) {
          console.log(error);
          return;
        }
        this.specialityID = res.result;
        console.log(this.specialityID[0].MedicalSpecialityID);
        this.idConvert = this.specialityID[0].MedicalSpecialityID;
      }
    );

    let paramsEditDoctor = {
      id: element.DoctorID,
      medicalSpecialityID: this.idConvert,
      lastName: element.LastName,
      firstName: element.FirstName,
      phoneNumber: element.PhoneNumber,
      email: element.Email,
      doctorType: element.DoctorType,
    };

    this.rpcService.callRPC(
      'doctors.editDoctor',
      paramsEditDoctor,
      (error: any, res: any) => {
        console.log('intra in edit');
        console.log(paramsEditDoctor.medicalSpecialityID);
        if (error) {
          console.log(error);
          return;
        }
        this.getDoctors();
      }
    );
    this.editMode = false;
  }
}
