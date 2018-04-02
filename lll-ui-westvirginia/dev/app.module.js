import angular from 'angular';

import 'lll-core/lll-core-module';
import 'lll-routing/lll-routing-module';
import 'lll-elements/lll-elements-module';
import 'lll-scorm/lll-scorm-module';

import appInit from './app-init-service';
import lllConfig from './config/lll-app.conf.json!';

angular.module('app', [
    'lllCore',
    'lllRouting',
    'lllElements',
    'lllScorm'
])
.constant('lllConfig', lllConfig)
.service('appInit', appInit);
