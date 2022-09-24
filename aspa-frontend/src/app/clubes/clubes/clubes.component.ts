import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Club } from '../../shared/models/Club';
import { ClubService } from '../../shared/services/club.service';

@Component({
  selector: 'aspa-clubes',
  templateUrl: './clubes.component.html',
  styleUrls: ['./clubes.component.scss'],
})
export class ClubesComponent implements OnInit {
  clubes: Array<Club>;
  error = false;
  errorMessage = 'No se han podido cargar los clubes';
  loadingMessage = 'Cargando clubes';

  constructor(private clubService: ClubService) {}

  ngOnInit() {
    this.getClubes();
  }

  getClubes() {
    this.clubService.getAll().subscribe(
      clubes => {
        this.clubes = clubes;
      },
      (error: HttpErrorResponse) => {
        this.error = true;
      }
    );
  }

  onClubesChanged() {
    this.getClubes();
  }

  onRetry() {
    this.error = false;
    this.ngOnInit();
  }
}
