/*
* @Author: Administrator
* @Date:   2017-01-04 16:03:12
* @Last Modified by:   Administrator
* @Last Modified time: 2017-01-16 10:28:24
*/

export const ROOT = 'http://localhost:9000';

export const API_ROOT = (process.env.NODE_ENV === 'production') ? `${ROOT}/admin` : `${ROOT}/admin`;

// export const COUNT_PERPAGE = 2;