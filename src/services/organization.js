import request from '@/utils/request';

export async function fakeOrganizationGroup(params) {
  return request('https://www.fastmock.site/mock/f1c288f0679b39410fbf3161f29a6567/minieye/tree/organization', {
    method: 'GET',
    data: params,
  });
}
