// Fetch the json payload from this url https://git.door43.org/api/v1/catalog/search?includeMetadata=false&showIngredients=false
export const getCatalog = async ({ stage }) => {
  const res = await fetch(
    `https://git.door43.org/api/v1/catalog/search?stage=${stage}&includeMetadata=true&showIngredients=true&partialMatch=true&subject=Aligned%20Bible,Bible,Translation`
  );
  const data = await res.json();
  return data;
};

export const getLanguagesFromCatalog = ({ catalog }) => {
  const { data = [] } = catalog || {};
  const languages = {};

  data.forEach(
    ({ language, language_title, language_direction, language_is_gl }) => {
      languages[language] = {
        language,
        language_title,
        language_direction,
        language_is_gl,
      };
    }
  );

  return languages;
};

export const getOwnersFromCatalog = ({ catalog, language: _language }) => {
  const { data = [] } = catalog || {};
  const owners = {};

  data.forEach(({ language, repo: { owner } }) => {
    if (language === _language) {
      owners[owner.login] = owner;
    }
  });

  return owners;
};

export const getResourcesFromCatalog = ({ catalog, language, owner }) => {
  const { data = [] } = catalog || {};
  const resources = {};

  data.forEach((resource) => {
    const matchLanguage = !language || resource.language === language;
    const matchOwner = !owner || resource.owner === owner;

    if (matchLanguage && matchOwner) {
      resources[resource.full_name] = resource;
    }
  });

  return resources;
};

//  and parse it into an array of objects with the following properties: language, languageName, owner, subject.
export const filterCascadeCatalog = (catalog) => {
  const { data = [] } = catalog || {};
  const response = [];
  const filtered = {};

  data.forEach((object) => {
    const {
      id,
      url,
      name,
      owner,
      language,
      language_title,
      language_direction,
      language_is_gl,
      branch_or_tag_name,
      subject,
      title,
      checking_level,
      books,
      ingredients,
    } = object;

    const resource = {
      label: `${title}: (${subject})`,
      value: name,
      children: (ingredients || []).map((ingredient = {}) => ({
        label: `${ingredient.title}: (${ingredient.identifier})`,
        value: ingredient.identifier,
      })),
    };

    filtered[language] ||= {
      label: `${language_title}: (${language})`,
      value: language,
      owners: {},
      children: [],
    };

    filtered[language].owners[owner] ||= {
      label: owner,
      value: owner,
      children: [],
    };

    filtered[language].owners[owner].children.push(resource);
  });

  Object.values(filtered).forEach((object) => {
    const { owners } = object;
    object.children = Object.values(owners);
    response.push(object);
  });

  return response;
};

//  The language property should be the languageId, and the languageName should be the localized name of the language from the object.
//  The owner property should be the owner of the resource, and the subject should be the subject of the resource.
//  The array should be sorted by languageName, owner, and subject.
//  The array should be returned from the function.
//  The function should be exported as default.
//  The function should be named getCatalog.
//  The function should be in the file src/core/catalog.js.
//  The function should be tested in src/core/catalog.test.js.
const example = {
  ok: true,
  data: [
    {
      id: 5854,
      url: 'https://git.door43.org/api/v1/catalog/entry/Door43-Catalog/am_ulb/v7.2/',
      name: 'am_ulb',
      owner: 'Door43-Catalog',
      full_name: 'Door43-Catalog/am_ulb',
      repo: {
        id: 29597,
        owner: {
          id: 4598,
          login: 'Door43-Catalog',
          full_name: 'Door43 Resource Catalog',
          email: 'door43-catalog@noreply.door43.org',
          avatar_url: 'https://git.door43.org/assets/img/avatar_default.png',
          language: '',
          is_admin: false,
          last_login: '0001-01-01T00:00:00Z',
          created: '2016-10-18T19:03:36Z',
          repo_languages: null,
          repo_subjects: null,
          restricted: false,
          active: false,
          prohibit_login: false,
          location: '',
          website: 'https://api-info.readthedocs.io/',
          description:
            'The resources listed here have been published into the Door43 Catalog.  Fill out the form at http://ufw.io/pub to get yours included.',
          visibility: 'public',
          followers_count: 0,
          following_count: 0,
          starred_repos_count: 0,
          username: 'Door43-Catalog',
        },
        name: 'am_ulb',
        full_name: 'Door43-Catalog/am_ulb',
        description:
          'Amharic ULB\r\n\r\nSTR https://git.door43.org/unfoldingWord/SourceTextRequestForm/issues/206 for OT.',
        empty: false,
        private: false,
        fork: false,
        template: false,
        parent: null,
        mirror: false,
        size: 1760,
        languages_url:
          'https://git.door43.org/api/v1/repos/Door43-Catalog/am_ulb/languages',
        html_url: 'https://git.door43.org/Door43-Catalog/am_ulb',
        ssh_url: 'git@git.door43.org:Door43-Catalog/am_ulb.git',
        clone_url: 'https://git.door43.org/Door43-Catalog/am_ulb.git',
        original_url: '',
        website: '',
        stars_count: 0,
        forks_count: 1,
        watchers_count: 8,
        open_issues_count: 0,
        open_pr_counter: 0,
        release_counter: 1,
        default_branch: 'master',
        archived: false,
        created_at: '2018-09-18T20:33:17Z',
        updated_at: '2021-01-04T05:29:58Z',
        permissions: { admin: false, push: false, pull: true },
        has_issues: true,
        internal_tracker: {
          enable_time_tracker: true,
          allow_only_contributors_to_track_time: true,
          enable_issue_dependencies: true,
        },
        has_wiki: true,
        has_pull_requests: true,
        has_projects: false,
        ignore_whitespace_conflicts: false,
        allow_merge_commits: false,
        allow_rebase: false,
        allow_rebase_explicit: true,
        allow_squash_merge: false,
        default_merge_style: 'merge',
        avatar_url: '',
        internal: false,
        mirror_interval: '',
        mirror_updated: '0001-01-01T00:00:00Z',
        repo_transfer: null,
        language: 'am',
        language_title: 'Amharic',
        language_direction: 'ltr',
        language_is_gl: true,
        subject: 'Bible',
        books: [
          'gen',
          'exo',
          'lev',
          'num',
          'deu',
          'jos',
          'jdg',
          'rut',
          '1sa',
          '2sa',
          '1ki',
          '2ki',
          '1ch',
          '2ch',
          'ezr',
          'neh',
          'est',
          'job',
          'psa',
          'pro',
          'ecc',
          'sng',
          'isa',
          'jer',
          'lam',
          'ezk',
          'dan',
          'hos',
          'jol',
          'amo',
          'oba',
          'jon',
          'mic',
          'nam',
          'hab',
          'zep',
          'hag',
          'zec',
          'mal',
          'mat',
          'mrk',
          'luk',
          'jhn',
          'act',
          'rom',
          '1co',
          '2co',
          'gal',
          'eph',
          'php',
          'col',
          '1th',
          '2th',
          '1ti',
          '2ti',
          'tit',
          'phm',
          'heb',
          'jas',
          '1pe',
          '2pe',
          '1jn',
          '2jn',
          '3jn',
          'jud',
          'rev',
        ],
        title: 'Unlocked Literal Bible',
        checking_level: '3',
        catalog: null,
      },
      release: {
        id: 980636,
        tag_name: 'v7.2',
        target_commitish: 'master',
        name: 'Version 7.2',
        body: '',
        url: 'https://git.door43.org/api/v1/repos/Door43-Catalog/am_ulb/releases/980636',
        html_url:
          'https://git.door43.org/Door43-Catalog/am_ulb/releases/tag/v7.2',
        tarball_url:
          'https://git.door43.org/Door43-Catalog/am_ulb/archive/v7.2.tar.gz',
        zipball_url:
          'https://git.door43.org/Door43-Catalog/am_ulb/archive/v7.2.zip',
        draft: false,
        prerelease: false,
        created_at: '2022-04-21T18:38:33Z',
        published_at: '2022-04-21T18:38:33Z',
        author: {
          id: 3,
          login: 'richmahn',
          full_name: 'Richard Mahn',
          email: 'richmahn@noreply.door43.org',
          avatar_url:
            'https://git.door43.org/avatars/a21e856c4d0d5dbccd0e80fa393af14b',
          language: '',
          is_admin: false,
          last_login: '0001-01-01T00:00:00Z',
          created: '2016-02-04T01:26:44Z',
          repo_languages: null,
          repo_subjects: null,
          restricted: false,
          active: false,
          prohibit_login: false,
          location: 'Orlando, Florida',
          website: 'http://www.linkedin.com/in/richmahn',
          description: '',
          visibility: 'public',
          followers_count: 2,
          following_count: 8,
          starred_repos_count: 0,
          username: 'richmahn',
        },
        assets: [
          {
            id: 4103,
            name: 'am_ulb_01-GEN_v7.2.pdf',
            size: 450901,
            download_count: 21,
            created_at: '2022-05-03T15:45:42Z',
            uuid: '080053f4-0697-42cb-9c5b-fa608807af26',
            browser_download_url:
              'https://git.door43.org/attachments/080053f4-0697-42cb-9c5b-fa608807af26',
          },
          {
            id: 4104,
            name: 'am_ulb_02-EXO_v7.2.pdf',
            size: 371089,
            download_count: 21,
            created_at: '2022-05-03T15:45:48Z',
            uuid: 'e8091484-a2c3-43e3-abfd-63bdb4031c54',
            browser_download_url:
              'https://git.door43.org/attachments/e8091484-a2c3-43e3-abfd-63bdb4031c54',
          },
          {
            id: 4105,
            name: 'am_ulb_03-LEV_v7.2.pdf',
            size: 279337,
            download_count: 21,
            created_at: '2022-05-03T15:45:50Z',
            uuid: '38bbd3d3-326a-4be8-8326-7fd1c3f52113',
            browser_download_url:
              'https://git.door43.org/attachments/38bbd3d3-326a-4be8-8326-7fd1c3f52113',
          },
          {
            id: 4106,
            name: 'am_ulb_04-NUM_v7.2.pdf',
            size: 368088,
            download_count: 20,
            created_at: '2022-05-03T15:45:52Z',
            uuid: '89536525-382a-4ed6-b88e-b3ff9ccd9dac',
            browser_download_url:
              'https://git.door43.org/attachments/89536525-382a-4ed6-b88e-b3ff9ccd9dac',
          },
          {
            id: 4107,
            name: 'am_ulb_05-DEU_v7.2.pdf',
            size: 323094,
            download_count: 22,
            created_at: '2022-05-03T15:45:54Z',
            uuid: '3e9105dd-0e0b-4747-83c9-eda770ae6d6c',
            browser_download_url:
              'https://git.door43.org/attachments/3e9105dd-0e0b-4747-83c9-eda770ae6d6c',
          },
          {
            id: 4108,
            name: 'am_ulb_06-JOS_v7.2.pdf',
            size: 246328,
            download_count: 21,
            created_at: '2022-05-03T15:45:56Z',
            uuid: 'd87832c4-52af-4d85-9359-2dbac47ecbeb',
            browser_download_url:
              'https://git.door43.org/attachments/d87832c4-52af-4d85-9359-2dbac47ecbeb',
          },
          {
            id: 4109,
            name: 'am_ulb_07-JDG_v7.2.pdf',
            size: 252656,
            download_count: 20,
            created_at: '2022-05-03T15:45:57Z',
            uuid: '5ab11ad3-2584-4256-b75e-c04ee71a9d40',
            browser_download_url:
              'https://git.door43.org/attachments/5ab11ad3-2584-4256-b75e-c04ee71a9d40',
          },
          {
            id: 4110,
            name: 'am_ulb_08-RUT_v7.2.pdf',
            size: 99721,
            download_count: 20,
            created_at: '2022-05-03T15:45:59Z',
            uuid: 'ff8868c4-fc90-4af6-96fe-d561d43553b9',
            browser_download_url:
              'https://git.door43.org/attachments/ff8868c4-fc90-4af6-96fe-d561d43553b9',
          },
          {
            id: 4111,
            name: 'am_ulb_09-1SA_v7.2.pdf',
            size: 318812,
            download_count: 20,
            created_at: '2022-05-03T15:46:00Z',
            uuid: 'abbc59d1-e8cc-49f5-a1a0-530acb01addc',
            browser_download_url:
              'https://git.door43.org/attachments/abbc59d1-e8cc-49f5-a1a0-530acb01addc',
          },
          {
            id: 4112,
            name: 'am_ulb_10-2SA_v7.2.pdf',
            size: 270933,
            download_count: 21,
            created_at: '2022-05-03T15:46:02Z',
            uuid: '023ec281-a4ca-4c08-80d0-4ad9a5fac60c',
            browser_download_url:
              'https://git.door43.org/attachments/023ec281-a4ca-4c08-80d0-4ad9a5fac60c',
          },
          {
            id: 4113,
            name: 'am_ulb_11-1KI_v7.2.pdf',
            size: 293552,
            download_count: 22,
            created_at: '2022-05-03T15:46:04Z',
            uuid: 'c0629955-7350-4ccb-b915-af53e40afbf2',
            browser_download_url:
              'https://git.door43.org/attachments/c0629955-7350-4ccb-b915-af53e40afbf2',
          },
          {
            id: 4114,
            name: 'am_ulb_12-2KI_v7.2.pdf',
            size: 287253,
            download_count: 16,
            created_at: '2022-05-03T15:46:06Z',
            uuid: '4f3f7976-1997-4c1f-962e-94c1a9a665eb',
            browser_download_url:
              'https://git.door43.org/attachments/4f3f7976-1997-4c1f-962e-94c1a9a665eb',
          },
          {
            id: 4115,
            name: 'am_ulb_13-1CH_v7.2.pdf',
            size: 292238,
            download_count: 19,
            created_at: '2022-05-03T15:46:08Z',
            uuid: 'a3b8e8cb-50e9-4770-8ffc-bf74094d3d80',
            browser_download_url:
              'https://git.door43.org/attachments/a3b8e8cb-50e9-4770-8ffc-bf74094d3d80',
          },
          {
            id: 4116,
            name: 'am_ulb_14-2CH_v7.2.pdf',
            size: 317524,
            download_count: 20,
            created_at: '2022-05-03T15:46:10Z',
            uuid: '4683bb16-4a76-4459-89d0-a062ae1c7cb1',
            browser_download_url:
              'https://git.door43.org/attachments/4683bb16-4a76-4459-89d0-a062ae1c7cb1',
          },
          {
            id: 4117,
            name: 'am_ulb_15-EZR_v7.2.pdf',
            size: 150084,
            download_count: 19,
            created_at: '2022-05-03T15:46:12Z',
            uuid: '35e29055-833a-4002-8ee8-007b6d1fb48f',
            browser_download_url:
              'https://git.door43.org/attachments/35e29055-833a-4002-8ee8-007b6d1fb48f',
          },
          {
            id: 4118,
            name: 'am_ulb_16-NEH_v7.2.pdf',
            size: 192335,
            download_count: 19,
            created_at: '2022-05-03T15:46:13Z',
            uuid: '66354c5c-17a7-40a4-9764-c1569c070bce',
            browser_download_url:
              'https://git.door43.org/attachments/66354c5c-17a7-40a4-9764-c1569c070bce',
          },
          {
            id: 4119,
            name: 'am_ulb_17-EST_v7.2.pdf',
            size: 132947,
            download_count: 19,
            created_at: '2022-05-03T15:46:15Z',
            uuid: 'ee755174-99b9-4f5a-b914-0ceda9791299',
            browser_download_url:
              'https://git.door43.org/attachments/ee755174-99b9-4f5a-b914-0ceda9791299',
          },
          {
            id: 4120,
            name: 'am_ulb_18-JOB_v7.2.pdf',
            size: 338623,
            download_count: 21,
            created_at: '2022-05-03T15:46:16Z',
            uuid: '66060562-d879-41e9-8b13-8bcc4732cdc6',
            browser_download_url:
              'https://git.door43.org/attachments/66060562-d879-41e9-8b13-8bcc4732cdc6',
          },
          {
            id: 4121,
            name: 'am_ulb_19-PSA_v7.2.pdf',
            size: 682137,
            download_count: 21,
            created_at: '2022-05-03T15:46:19Z',
            uuid: 'd620d771-5c19-4517-a91b-ab9b96eb0fce',
            browser_download_url:
              'https://git.door43.org/attachments/d620d771-5c19-4517-a91b-ab9b96eb0fce',
          },
          {
            id: 4122,
            name: 'am_ulb_20-PRO_v7.2.pdf',
            size: 273252,
            download_count: 21,
            created_at: '2022-05-03T15:46:21Z',
            uuid: 'becd3df4-0002-46e7-bf03-6f9ad361106d',
            browser_download_url:
              'https://git.door43.org/attachments/becd3df4-0002-46e7-bf03-6f9ad361106d',
          },
          {
            id: 4123,
            name: 'am_ulb_21-ECC_v7.2.pdf',
            size: 137193,
            download_count: 21,
            created_at: '2022-05-03T15:46:22Z',
            uuid: 'c39d4d1d-7a80-4159-b427-ab39c4baccb1',
            browser_download_url:
              'https://git.door43.org/attachments/c39d4d1d-7a80-4159-b427-ab39c4baccb1',
          },
          {
            id: 4124,
            name: 'am_ulb_22-SNG_v7.2.pdf',
            size: 113071,
            download_count: 21,
            created_at: '2022-05-03T15:46:24Z',
            uuid: '50214147-e814-408d-a8fd-eb34f9d3f258',
            browser_download_url:
              'https://git.door43.org/attachments/50214147-e814-408d-a8fd-eb34f9d3f258',
          },
          {
            id: 4125,
            name: 'am_ulb_23-ISA_v7.2.pdf',
            size: 444988,
            download_count: 17,
            created_at: '2022-05-03T15:46:26Z',
            uuid: 'dea69872-06fe-4037-9c28-0a113e778879',
            browser_download_url:
              'https://git.door43.org/attachments/dea69872-06fe-4037-9c28-0a113e778879',
          },
          {
            id: 4126,
            name: 'am_ulb_24-JER_v7.2.pdf',
            size: 456361,
            download_count: 21,
            created_at: '2022-05-03T15:46:28Z',
            uuid: '09427141-e430-4aef-9e83-d0da4be116a7',
            browser_download_url:
              'https://git.door43.org/attachments/09427141-e430-4aef-9e83-d0da4be116a7',
          },
          {
            id: 4127,
            name: 'am_ulb_25-LAM_v7.2.pdf',
            size: 117708,
            download_count: 21,
            created_at: '2022-05-03T15:46:30Z',
            uuid: '49ba0dc9-3e02-4316-acdd-5407a0dca42f',
            browser_download_url:
              'https://git.door43.org/attachments/49ba0dc9-3e02-4316-acdd-5407a0dca42f',
          },
          {
            id: 4128,
            name: 'am_ulb_26-EZK_v7.2.pdf',
            size: 407819,
            download_count: 21,
            created_at: '2022-05-03T15:46:31Z',
            uuid: 'fcd2008d-6103-47a7-98d9-01b5527ccdb4',
            browser_download_url:
              'https://git.door43.org/attachments/fcd2008d-6103-47a7-98d9-01b5527ccdb4',
          },
          {
            id: 4129,
            name: 'am_ulb_27-DAN_v7.2.pdf',
            size: 178907,
            download_count: 21,
            created_at: '2022-05-03T15:46:33Z',
            uuid: '58787050-b859-4fa6-8c0e-c908d110c874',
            browser_download_url:
              'https://git.door43.org/attachments/58787050-b859-4fa6-8c0e-c908d110c874',
          },
          {
            id: 4130,
            name: 'am_ulb_28-HOS_v7.2.pdf',
            size: 140510,
            download_count: 21,
            created_at: '2022-05-03T15:46:35Z',
            uuid: '99d9791a-9fc9-4406-aa72-a009965470c1',
            browser_download_url:
              'https://git.door43.org/attachments/99d9791a-9fc9-4406-aa72-a009965470c1',
          },
          {
            id: 4131,
            name: 'am_ulb_29-JOL_v7.2.pdf',
            size: 94967,
            download_count: 22,
            created_at: '2022-05-03T15:46:36Z',
            uuid: '2bac7b4c-f087-4fd0-afcc-9d114ab2ba0c',
            browser_download_url:
              'https://git.door43.org/attachments/2bac7b4c-f087-4fd0-afcc-9d114ab2ba0c',
          },
          {
            id: 4132,
            name: 'am_ulb_30-AMO_v7.2.pdf',
            size: 122907,
            download_count: 21,
            created_at: '2022-05-03T15:46:37Z',
            uuid: 'c78548b2-91cd-4fff-ae72-6f172415a513',
            browser_download_url:
              'https://git.door43.org/attachments/c78548b2-91cd-4fff-ae72-6f172415a513',
          },
          {
            id: 4133,
            name: 'am_ulb_31-OBA_v7.2.pdf',
            size: 74574,
            download_count: 20,
            created_at: '2022-05-03T15:46:38Z',
            uuid: '9a6592fb-5e90-4676-bf0f-048e574c4be6',
            browser_download_url:
              'https://git.door43.org/attachments/9a6592fb-5e90-4676-bf0f-048e574c4be6',
          },
          {
            id: 4134,
            name: 'am_ulb_32-JON_v7.2.pdf',
            size: 87879,
            download_count: 21,
            created_at: '2022-05-03T15:46:39Z',
            uuid: '25625c28-28be-4687-870b-d560af4e3209',
            browser_download_url:
              'https://git.door43.org/attachments/25625c28-28be-4687-870b-d560af4e3209',
          },
          {
            id: 4135,
            name: 'am_ulb_33-MIC_v7.2.pdf',
            size: 111399,
            download_count: 19,
            created_at: '2022-05-03T15:46:40Z',
            uuid: 'a5f83939-b0cd-477d-bfef-d57b14d43ca0',
            browser_download_url:
              'https://git.door43.org/attachments/a5f83939-b0cd-477d-bfef-d57b14d43ca0',
          },
          {
            id: 4136,
            name: 'am_ulb_34-NAM_v7.2.pdf',
            size: 89310,
            download_count: 20,
            created_at: '2022-05-03T15:46:41Z',
            uuid: '0a1b2f69-30cf-4922-bdbc-d25439bb2bf9',
            browser_download_url:
              'https://git.door43.org/attachments/0a1b2f69-30cf-4922-bdbc-d25439bb2bf9',
          },
          {
            id: 4137,
            name: 'am_ulb_35-HAB_v7.2.pdf',
            size: 90925,
            download_count: 18,
            created_at: '2022-05-03T15:46:43Z',
            uuid: '4a8515c2-5226-433a-8c18-2c3d44bd7605',
            browser_download_url:
              'https://git.door43.org/attachments/4a8515c2-5226-433a-8c18-2c3d44bd7605',
          },
          {
            id: 4138,
            name: 'am_ulb_36-ZEP_v7.2.pdf',
            size: 92536,
            download_count: 17,
            created_at: '2022-05-03T15:46:44Z',
            uuid: 'e2091d04-39c4-48ea-b617-5c369418a259',
            browser_download_url:
              'https://git.door43.org/attachments/e2091d04-39c4-48ea-b617-5c369418a259',
          },
          {
            id: 4139,
            name: 'am_ulb_37-HAG_v7.2.pdf',
            size: 79098,
            download_count: 19,
            created_at: '2022-05-03T15:46:45Z',
            uuid: '74589051-3116-4936-b4cd-8fd91a3f34e3',
            browser_download_url:
              'https://git.door43.org/attachments/74589051-3116-4936-b4cd-8fd91a3f34e3',
          },
          {
            id: 4140,
            name: 'am_ulb_38-ZEC_v7.2.pdf',
            size: 144976,
            download_count: 19,
            created_at: '2022-05-03T15:46:46Z',
            uuid: '73f1393d-38d2-4eb0-9321-39d440d3d593',
            browser_download_url:
              'https://git.door43.org/attachments/73f1393d-38d2-4eb0-9321-39d440d3d593',
          },
          {
            id: 4141,
            name: 'am_ulb_39-MAL_v7.2.pdf',
            size: 90428,
            download_count: 19,
            created_at: '2022-05-03T15:46:48Z',
            uuid: '8854eb3b-7f3d-4212-9925-9ae4612648c4',
            browser_download_url:
              'https://git.door43.org/attachments/8854eb3b-7f3d-4212-9925-9ae4612648c4',
          },
          {
            id: 4142,
            name: 'am_ulb_41-MAT_v7.2.pdf',
            size: 326159,
            download_count: 16,
            created_at: '2022-05-03T15:46:49Z',
            uuid: '8dc760c8-3bb2-4566-9bea-06be47d3d93d',
            browser_download_url:
              'https://git.door43.org/attachments/8dc760c8-3bb2-4566-9bea-06be47d3d93d',
          },
          {
            id: 4143,
            name: 'am_ulb_42-MRK_v7.2.pdf',
            size: 229279,
            download_count: 17,
            created_at: '2022-05-03T15:46:51Z',
            uuid: '6a220652-2267-4ed6-9a27-a84ecb7716bf',
            browser_download_url:
              'https://git.door43.org/attachments/6a220652-2267-4ed6-9a27-a84ecb7716bf',
          },
          {
            id: 4144,
            name: 'am_ulb_43-LUK_v7.2.pdf',
            size: 340648,
            download_count: 19,
            created_at: '2022-05-03T15:46:53Z',
            uuid: '91e43cc0-08ae-450d-a26b-d068de81d8bb',
            browser_download_url:
              'https://git.door43.org/attachments/91e43cc0-08ae-450d-a26b-d068de81d8bb',
          },
          {
            id: 4145,
            name: 'am_ulb_44-JHN_v7.2.pdf',
            size: 275180,
            download_count: 19,
            created_at: '2022-05-03T15:46:55Z',
            uuid: '767f827c-3c07-4320-9f56-549acc8545f3',
            browser_download_url:
              'https://git.door43.org/attachments/767f827c-3c07-4320-9f56-549acc8545f3',
          },
          {
            id: 4146,
            name: 'am_ulb_45-ACT_v7.2.pdf',
            size: 329606,
            download_count: 18,
            created_at: '2022-05-03T15:46:57Z',
            uuid: 'f3de889a-30f5-4731-80cf-a0ec67a688d7',
            browser_download_url:
              'https://git.door43.org/attachments/f3de889a-30f5-4731-80cf-a0ec67a688d7',
          },
          {
            id: 4147,
            name: 'am_ulb_46-ROM_v7.2.pdf',
            size: 182969,
            download_count: 17,
            created_at: '2022-05-03T15:46:58Z',
            uuid: '47a4a796-79c2-4ff0-adee-258269308f10',
            browser_download_url:
              'https://git.door43.org/attachments/47a4a796-79c2-4ff0-adee-258269308f10',
          },
          {
            id: 4148,
            name: 'am_ulb_47-1CO_v7.2.pdf',
            size: 183777,
            download_count: 19,
            created_at: '2022-05-03T15:47:00Z',
            uuid: 'd055a41d-4822-4ad0-a5ac-ed22fa474363',
            browser_download_url:
              'https://git.door43.org/attachments/d055a41d-4822-4ad0-a5ac-ed22fa474363',
          },
          {
            id: 4149,
            name: 'am_ulb_48-2CO_v7.2.pdf',
            size: 148979,
            download_count: 17,
            created_at: '2022-05-03T15:47:02Z',
            uuid: 'd7d79634-428f-4e35-bc71-1d3c59813c79',
            browser_download_url:
              'https://git.door43.org/attachments/d7d79634-428f-4e35-bc71-1d3c59813c79',
          },
          {
            id: 4150,
            name: 'am_ulb_49-GAL_v7.2.pdf',
            size: 112764,
            download_count: 16,
            created_at: '2022-05-03T15:47:03Z',
            uuid: '7cae6f2b-85ae-468d-a103-47bb488b80fa',
            browser_download_url:
              'https://git.door43.org/attachments/7cae6f2b-85ae-468d-a103-47bb488b80fa',
          },
          {
            id: 4151,
            name: 'am_ulb_50-EPH_v7.2.pdf',
            size: 110953,
            download_count: 19,
            created_at: '2022-05-03T15:47:04Z',
            uuid: '994b0c8c-d66d-4aae-97e1-749d205b7e2e',
            browser_download_url:
              'https://git.door43.org/attachments/994b0c8c-d66d-4aae-97e1-749d205b7e2e',
          },
          {
            id: 4152,
            name: 'am_ulb_51-PHP_v7.2.pdf',
            size: 100255,
            download_count: 19,
            created_at: '2022-05-03T15:47:05Z',
            uuid: 'a933938b-0954-4429-9cbd-dd00ad3a7db0',
            browser_download_url:
              'https://git.door43.org/attachments/a933938b-0954-4429-9cbd-dd00ad3a7db0',
          },
          {
            id: 4153,
            name: 'am_ulb_52-COL_v7.2.pdf',
            size: 96348,
            download_count: 17,
            created_at: '2022-05-03T15:47:06Z',
            uuid: '83939bc9-5596-46a1-87d3-bb7aa0eb1c99',
            browser_download_url:
              'https://git.door43.org/attachments/83939bc9-5596-46a1-87d3-bb7aa0eb1c99',
          },
          {
            id: 4154,
            name: 'am_ulb_53-1TH_v7.2.pdf',
            size: 95372,
            download_count: 9,
            created_at: '2022-05-03T15:47:07Z',
            uuid: '2ff4bea2-955f-431d-be46-76c20c607ff5',
            browser_download_url:
              'https://git.door43.org/attachments/2ff4bea2-955f-431d-be46-76c20c607ff5',
          },
          {
            id: 4155,
            name: 'am_ulb_54-2TH_v7.2.pdf',
            size: 81259,
            download_count: 9,
            created_at: '2022-05-03T15:47:09Z',
            uuid: '33c19945-af72-4384-93ee-2e03915f2cc0',
            browser_download_url:
              'https://git.door43.org/attachments/33c19945-af72-4384-93ee-2e03915f2cc0',
          },
          {
            id: 4156,
            name: 'am_ulb_55-1TI_v7.2.pdf',
            size: 105241,
            download_count: 14,
            created_at: '2022-05-03T15:47:10Z',
            uuid: '76ff30cf-de24-4613-8781-da0ddd0c2628',
            browser_download_url:
              'https://git.door43.org/attachments/76ff30cf-de24-4613-8781-da0ddd0c2628',
          },
          {
            id: 4157,
            name: 'am_ulb_56-2TI_v7.2.pdf',
            size: 94402,
            download_count: 10,
            created_at: '2022-05-03T15:47:11Z',
            uuid: 'c45a17ab-f9df-46c9-9b35-d10e3e1e0066',
            browser_download_url:
              'https://git.door43.org/attachments/c45a17ab-f9df-46c9-9b35-d10e3e1e0066',
          },
          {
            id: 4158,
            name: 'am_ulb_57-TIT_v7.2.pdf',
            size: 85753,
            download_count: 10,
            created_at: '2022-05-03T15:47:12Z',
            uuid: '2f9b386e-7dc4-4c68-8bf1-f2d5d56b2b1f',
            browser_download_url:
              'https://git.door43.org/attachments/2f9b386e-7dc4-4c68-8bf1-f2d5d56b2b1f',
          },
          {
            id: 4159,
            name: 'am_ulb_58-PHM_v7.2.pdf',
            size: 70623,
            download_count: 10,
            created_at: '2022-05-03T15:47:13Z',
            uuid: '05c19843-2f74-411c-a5fc-1c5e2783831f',
            browser_download_url:
              'https://git.door43.org/attachments/05c19843-2f74-411c-a5fc-1c5e2783831f',
          },
          {
            id: 4160,
            name: 'am_ulb_59-HEB_v7.2.pdf',
            size: 160453,
            download_count: 11,
            created_at: '2022-05-03T15:47:14Z',
            uuid: 'e4bf4075-2121-468b-bcad-532cc21e0a9b',
            browser_download_url:
              'https://git.door43.org/attachments/e4bf4075-2121-468b-bcad-532cc21e0a9b',
          },
          {
            id: 4161,
            name: 'am_ulb_60-JAS_v7.2.pdf',
            size: 105096,
            download_count: 10,
            created_at: '2022-05-03T15:47:15Z',
            uuid: 'caca87ca-a36c-4088-b7c6-fc6c0eeb5baf',
            browser_download_url:
              'https://git.door43.org/attachments/caca87ca-a36c-4088-b7c6-fc6c0eeb5baf',
          },
          {
            id: 4162,
            name: 'am_ulb_61-1PE_v7.2.pdf',
            size: 108046,
            download_count: 10,
            created_at: '2022-05-03T15:47:16Z',
            uuid: 'bb0fc6f9-d6dc-49c4-b6e0-374135676b1c',
            browser_download_url:
              'https://git.door43.org/attachments/bb0fc6f9-d6dc-49c4-b6e0-374135676b1c',
          },
          {
            id: 4163,
            name: 'am_ulb_62-2PE_v7.2.pdf',
            size: 93503,
            download_count: 11,
            created_at: '2022-05-03T15:47:18Z',
            uuid: '26411c46-8ee5-4b8d-a8e3-9b34b604fa69',
            browser_download_url:
              'https://git.door43.org/attachments/26411c46-8ee5-4b8d-a8e3-9b34b604fa69',
          },
          {
            id: 4164,
            name: 'am_ulb_63-1JN_v7.2.pdf',
            size: 97658,
            download_count: 9,
            created_at: '2022-05-03T15:47:19Z',
            uuid: '3903673e-cebe-46f0-aa83-e476f4a7518d',
            browser_download_url:
              'https://git.door43.org/attachments/3903673e-cebe-46f0-aa83-e476f4a7518d',
          },
          {
            id: 4165,
            name: 'am_ulb_64-2JN_v7.2.pdf',
            size: 67377,
            download_count: 10,
            created_at: '2022-05-03T15:47:20Z',
            uuid: '97789953-ccfb-4d12-a65e-059dafa86959',
            browser_download_url:
              'https://git.door43.org/attachments/97789953-ccfb-4d12-a65e-059dafa86959',
          },
          {
            id: 4166,
            name: 'am_ulb_65-3JN_v7.2.pdf',
            size: 67660,
            download_count: 10,
            created_at: '2022-05-03T15:47:21Z',
            uuid: 'da6cc7b0-5db7-4c5f-a4ac-787033f592d9',
            browser_download_url:
              'https://git.door43.org/attachments/da6cc7b0-5db7-4c5f-a4ac-787033f592d9',
          },
          {
            id: 4167,
            name: 'am_ulb_66-JUD_v7.2.pdf',
            size: 76312,
            download_count: 11,
            created_at: '2022-05-03T15:47:22Z',
            uuid: '07a6c55f-e6e6-4a13-b655-50f6a3cb7187',
            browser_download_url:
              'https://git.door43.org/attachments/07a6c55f-e6e6-4a13-b655-50f6a3cb7187',
          },
          {
            id: 4168,
            name: 'am_ulb_67-REV_v7.2.pdf',
            size: 202752,
            download_count: 10,
            created_at: '2022-05-03T15:47:23Z',
            uuid: '444747e2-18bd-465d-baf3-10aa80cefab7',
            browser_download_url:
              'https://git.door43.org/attachments/444747e2-18bd-465d-baf3-10aa80cefab7',
          },
          {
            id: 4169,
            name: 'am_ulb_v7.2.pdf',
            size: 6516941,
            download_count: 11,
            created_at: '2022-05-03T15:47:30Z',
            uuid: '0f24e2fe-6637-4d30-acee-2c2f55a194a4',
            browser_download_url:
              'https://git.door43.org/attachments/0f24e2fe-6637-4d30-acee-2c2f55a194a4',
          },
        ],
      },
      tarbar_url:
        'https://git.door43.org/Door43-Catalog/am_ulb/archive/v7.2.tar.gz',
      zipball_url:
        'https://git.door43.org/Door43-Catalog/am_ulb/archive/v7.2.zip',
      git_trees_url:
        'https://git.door43.org/api/v1/repos/Door43-Catalog/am_ulb/git/trees/v7.2?recursive=1\u0026per_page=99999',
      contents_url:
        'https://git.door43.org/api/v1/repos/Door43-Catalog/am_ulb/contents?ref=v7.2',
      language: 'am',
      language_title: 'Amharic',
      language_direction: 'ltr',
      language_is_gl: true,
      subject: 'Bible',
      title: 'Unlocked Literal Bible',
      branch_or_tag_name: 'v7.2',
      stage: 'prod',
      metadata_url:
        'https://git.door43.org/Door43-Catalog/am_ulb/raw/tag/v7.2/manifest.yaml',
      metadata_json_url:
        'https://git.door43.org/api/v1/catalog/entry/Door43-Catalog/am_ulb/v7.2/metadata/',
      metadata_api_contents_url:
        'https://git.door43.org/api/v1/repos/Door43-Catalog/am_ulb/contents/manifest.yaml?ref=v7.2',
      metadata_version: 'rc0.2',
      released: '2022-04-21T18:38:33Z',
      books: [
        'gen',
        'exo',
        'lev',
        'num',
        'deu',
        'jos',
        'jdg',
        'rut',
        '1sa',
        '2sa',
        '1ki',
        '2ki',
        '1ch',
        '2ch',
        'ezr',
        'neh',
        'est',
        'job',
        'psa',
        'pro',
        'ecc',
        'sng',
        'isa',
        'jer',
        'lam',
        'ezk',
        'dan',
        'hos',
        'jol',
        'amo',
        'oba',
        'jon',
        'mic',
        'nam',
        'hab',
        'zep',
        'hag',
        'zec',
        'mal',
        'mat',
        'mrk',
        'luk',
        'jhn',
        'act',
        'rom',
        '1co',
        '2co',
        'gal',
        'eph',
        'php',
        'col',
        '1th',
        '2th',
        '1ti',
        '2ti',
        'tit',
        'phm',
        'heb',
        'jas',
        '1pe',
        '2pe',
        '1jn',
        '2jn',
        '3jn',
        'jud',
        'rev',
      ],
      ingredients: [
        {
          categories: ['bible-ot'],
          identifier: 'gen',
          path: './01-GEN.usfm',
          sort: 1,
          title: 'ኦሪት ዘፍጥረት',
          versification: 'ufw',
        },
        {
          categories: ['bible-ot'],
          identifier: 'exo',
          path: './02-EXO.usfm',
          sort: 2,
          title: 'ዘጸአት',
          versification: 'ufw',
        },
      ],
    },
  ],
  last_updated: '2022-04-21T18:38:33Z',
};
