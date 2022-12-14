import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { RpcService } from '../services/rpc.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss']
})
export class DoctorsComponent implements OnInit {

  dataSource: any;
  doctorInfo: any;
  modalOpen = false;

  constructor(
    private rpcService: RpcService
  ) { }

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]> | undefined;

  ngOnInit(): void {
    console.log('s a initializat componenta');
    let query = `SELECT * FROM Doctors;`;

    let copyInstance = this;

    this.rpcService.callRPC('doctors.getDoctor', query, (err: any, res: any) => {

      if (err || res.error) {
        console.log('nu s au putut afisa doctorii');
        return;
      }
      copyInstance.doctorInfo = res.result;
      this.doctorInfo = copyInstance.doctorInfo;
      console.log(this.doctorInfo);
      this.dataSource = this.doctorInfo;
    });

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
