import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { filterData } from 'src/app/shared/components/filter/filter.model';
import { PropertyTileComponent } from 'src/app/shared/components/property-tile/property-tile.component';
import { PropertyType } from 'src/app/shared/models/property.model';
import { NzModule } from 'src/app/shared/modules/nz.module';

@Component({
  standalone: true,
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.scss'],
  imports: [CommonModule, PropertyTileComponent, NzModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PropertyCardComponent { 
  @Output() filterChanged = new EventEmitter<filterData[]>()
  @Input() properties!: PropertyType[]
}
