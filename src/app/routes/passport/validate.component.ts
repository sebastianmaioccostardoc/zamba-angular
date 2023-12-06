import { HttpContext } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ALLOW_ANONYMOUS } from '@delon/auth';
import { _HttpClient } from '@delon/theme';
import { MatchControl } from '@delon/util/form';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { environment } from '@env/environment';

@Component({
    selector: 'passport-validate',
    templateUrl: './validate.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class ValidateComponent {
}
