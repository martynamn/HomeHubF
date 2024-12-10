import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { NzModule } from '../../modules/nz.module'
import { filterData, filterType } from './filter.model'
import { FilterService } from '../../services/filter.service'

@Component({
  selector: 'app-filter',
  standalone: true,
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule, NzModule]
})
export class FilterComponent implements OnInit {
  @Output() filterChanged = new EventEmitter<filterData[]>()
  filters: filterType | undefined
  filterData: filterData[] = []
  filter!: string
  _userId: string | undefined
  @Input() set userId(userId: string | undefined) {
    if (userId) {
      this._userId = userId
    }
  }
  public get userId() {
    return this._userId
  }

  constructor(
    private readonly filterService: FilterService,
    private readonly cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.filterService.getFilterByParam(undefined, this.userId).subscribe(data => {
      this.filters = data
      this.cdr.detectChanges()
    })
  }

  handleFilterChange(key: string, selectedValue: string) {
    const index = this.filterData.findIndex(item => item.key === key)
    if (index !== -1) {
      this.filterData[index].value = selectedValue
    } else {
      this.filterData.push({ key, value: selectedValue })
    }
    const filteredArray = this.filterData?.filter(param => param.value)
    this.filterService.getFilterByParam(filteredArray, this.userId).subscribe(data => {
      this.filters = data
      this.cdr.detectChanges()
    })
    this.filterChanged.emit(this.filterData)
  }
}
