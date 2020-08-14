import request from '@/utils/request';
import urlConfig from '../../config/urlConfig';

export async function fakeOrganizationGroup(params) {
  let url = urlConfig.host+urlConfig.path.tree_organization;
  return request(url, {
    method: 'GET',
    data: params,
  });
}
