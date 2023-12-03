import { getInfoByPath } from './utils';

export async function getCalendar() {
  const headers = new Headers({
    'User-Agent':
      'nuttycc/next-bangumi/1.0 (https://github.com/nuttycc/next-bangumi)',
  });

  try {
    const url = 'https://api.bgm.tv/calendar';
    const options = {
      headers,
      // next: { revalidate: 60000000 },
    };

    console.log('🕑 获取日历数据开始:' + new Date().toLocaleString());

    const response = await fetch(url, options);

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(
        `❌ Failed to fetch: ${response.status}, ${response.statusText}. ${errorMessage}`,
      );
    }

    console.log('🕛 获取日历数据结束:' + new Date().toLocaleString());
    return response.json();
  } catch (error) {
    console.error('❌ Failed to get calendar,', error);
    throw error;
  }
}

export async function getSubject(id) {
  const path = `/subjects/${id}`;
  const data = await getInfoByPath(path);
  return data;

}

export async function getPersons(id) {
  const path = `/subjects/${id}/persons`;
  const data = await getInfoByPath(path);
  return data;
}

export async function getCharacters(id) {
  const path = `/subjects/${id}/characters`;
  const data = await getInfoByPath(path);
  return data;
}

export async function getRelated(id) {
  const path = `/subjects/${id}/subjects`;
  const data = await getInfoByPath(path);
  return data;
}

// {small|grid|large|medium}
export async function getSubjectImage(id, type = 'grid') {
  const imageUrl = `https://api.bgm.tv/v0/subjects/${id}/image?type=${type}`;
  const headers = new Headers({
    'User-Agent':
      'nuttycc/next-bangumi/1.0 (https://github.com/nuttycc/next-bangumi)',
  });
  try {
    const response = await fetch(imageUrl, { headers });
    if (!response.ok) {
      throw new Error(`Failed to fetch image, ${response.status}.`);
    }
    const blob = await response.blob();
    const imgUrl = URL.createObjectURL(blob);
    return imgUrl;
  } catch (error) {
    throw error;
  }
}

export async function searchSubjectsBy(
  limit,
  offset = 0,
  { keyword = '', sort = 'rank', filter },
) {
  const headers = new Headers({
    'User-Agent':
      'nuttycc/next-bangumi/1.0 (https://github.com/nuttycc/next-bangumi)',
  });

  const {
    type = [2],
    tag = [],
    air_date = [],
    rating = [],
    rank = [],
    nsfw = false,
  } = filter;

  const body = JSON.stringify({
    keyword: keyword,
    sort: sort,
    filter: { type, tag, air_date, rating, rank, nsfw },
  });

  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: body,
  };

  try {
    const res = await fetch(
      `https://api.bgm.tv/v0/search/subjects?limit=${limit}&offset=${offset}`,
      requestOptions,
    );

    if (!res.ok) {
      const errorMessage = await res.text();
      throw new Error(
        `Failed to fetch: ${res.status}, ${res.statusText}. ${errorMessage}`,
      );
    }

    return res.json();
  } catch (error) {
    throw error;
  }
}


export async function searchByKeywords(keywords, type=2, resonseGroup='small', start=0, max_results=25) {
  const encodedKeywords = encodeURIComponent(keywords)
  const headers = new Headers({
    'User-Agent':
      'nuttycc/next-bangumi/1.0 (https://github.com/nuttycc/next-bangumi)',
  });
  try {
    const res = await fetch(
      `https://api.bgm.tv/search/subject/${encodedKeywords}?type=${type}&responseGroup=${resonseGroup}&start=${start}&max_results=${max_results}`,
      {headers}
    );

    if (!res.ok) {
      const errorMessage = await res.text();
      throw new Error(
        `Failed to fetch: ${res.status}, ${res.statusText}. ${errorMessage}`,
      );
    }

    return res.json();
  } catch (error) {
    throw error;
  }
}