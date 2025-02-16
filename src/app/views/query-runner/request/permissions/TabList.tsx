import { DetailsList, DetailsListLayoutMode, IColumn, Label, Link, SelectionMode } from '@fluentui/react';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';

import { AppDispatch, useAppSelector } from '../../../../../store';
import { IPermission } from '../../../../../types/permissions';
import { togglePermissionsPanel } from '../../../../services/actions/permissions-panel-action-creator';
import { setConsentedStatus } from './util';

interface ITabList {
  columns: any[];
  classes: any;
  renderItemColumn: Function;
  renderDetailsHeader: Function;
  maxHeight: string;
}

const TabList = ({ columns, classes, renderItemColumn, renderDetailsHeader, maxHeight }: ITabList) : JSX.Element => {
  const dispatch: AppDispatch = useDispatch();
  const { consentedScopes, scopes, authToken } = useAppSelector((state) => state);
  const permissions: IPermission[] = scopes.data.specificPermissions ? scopes.data.specificPermissions : [];
  const tokenPresent = !!authToken.token;
  const [isScreenSizeReduced, setIsScreenSizeReduced] = useState(false);

  setConsentedStatus(tokenPresent, permissions, consentedScopes);

  const openPermissionsPanel = () => {
    dispatch(togglePermissionsPanel(true));
  }

  const displayNoPermissionsFoundMessage = () : JSX.Element => {
    return (<Label className={classes.permissionLabel}>
      <FormattedMessage id='permissions not found in permissions tab' />
      <Link underline onClick={openPermissionsPanel}>
        <FormattedMessage id='open permissions panel' />
      </Link>
      <FormattedMessage id='permissions list' />
    </Label>);
  }

  const displayNotSignedInMessage = () : JSX.Element => {
    return (<Label className={classes.permissionLabel}>
      <FormattedMessage id='sign in to view a list of all permissions' />
    </Label>)
  }

  if (!tokenPresent && permissions.length === 0) {
    return displayNotSignedInMessage();
  }

  if(permissions.length === 0){
    return displayNoPermissionsFoundMessage();
  }

  return (
    <>
      <Label className={classes.permissionLength} style={{paddingLeft: '12px'}}>
        <FormattedMessage id='Permissions' />
      </Label>
      <Label className={classes.permissionText} style={{paddingLeft: '12px'}}>
        {!tokenPresent && <FormattedMessage id='sign in to consent to permissions' />}
        {tokenPresent && <FormattedMessage id='permissions required to run the query'/>}
      </Label>
      <div
        onMouseEnter={() => {

          if(screen.width < 1260 || window.innerWidth < 1290){
            setIsScreenSizeReduced(true);
          }
        }
        }
        onMouseLeave={() => setIsScreenSizeReduced(false)}>
        <DetailsList
          styles={!isScreenSizeReduced ? { root:
            { maxHeight, overflowX: 'hidden' } } : { root: { maxHeight} }}
          items={permissions}
          columns={columns}
          onRenderItemColumn={(item?: any, index?: number, column?: IColumn) => renderItemColumn(item, index, column)}
          selectionMode={SelectionMode.none}
          layoutMode={DetailsListLayoutMode.justified}
          onRenderDetailsHeader={(props?: any, defaultRender?: any) => renderDetailsHeader(props, defaultRender)} />
      </div>
    </>
  );
};

export default TabList;


