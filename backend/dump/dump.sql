

-- Project "Ewys"
INSERT INTO projects (uuid, photo_url, title, categories) VALUES ('81ee526d-beb0-4a71-a192-e2b5a9886146', 'EWYS.jpg', 'Ewys', '4');
INSERT INTO cards (project_uuid,  uuid,  title,  sub_title) VALUES ('81ee526d-beb0-4a71-a192-e2b5a9886146', '7255b537-93de-4d7f-b7ef-d81dc5837e6a', 'Front-end', 'Vue.js, Three.js');
INSERT INTO cards (project_uuid,  uuid,  title,  sub_title) VALUES ('81ee526d-beb0-4a71-a192-e2b5a9886146', '17ac43b3-1ad9-4464-84be-0d39eb37aa69', 'Back-end', 'NodeJs, Express, MySql');
INSERT INTO descriptions (project_uuid, uuid, lang, content) VALUES ('81ee526d-beb0-4a71-a192-e2b5a9886146', 'e90907e7-66e2-469a-b467-79bdf42bcf75', 'en', 'An application for an electronic menu with augmented reality elements for restaurants.');
INSERT INTO descriptions (project_uuid, uuid, lang, content) VALUES ('81ee526d-beb0-4a71-a192-e2b5a9886146', '48ea710e-9d9d-4297-92e3-8299612fc709', 'ru', 'Приложение для электронного меню с элементами дополненной реальности для ресторанов.');
INSERT INTO descriptions (project_uuid, uuid, lang, content) VALUES ('81ee526d-beb0-4a71-a192-e2b5a9886146', '59827d55-3900-4d6e-8b07-8bbb7ce9dab6', 'jp', 'レストランのための拡張現実要素を備えた電子メニューのためのアプリケーション。');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('81ee526d-beb0-4a71-a192-e2b5a9886146', '32b8ff49-7854-4485-b7a0-ddfe6ba0a7ab', 'jp', 'QRコードでレストランメニューを見る');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('81ee526d-beb0-4a71-a192-e2b5a9886146', '6630da59-eda9-4647-8029-9b1048c82cfc', 'jp', '個々の料理、その説明、写真、食材などを表示します');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('81ee526d-beb0-4a71-a192-e2b5a9886146', '80943b31-4460-47ce-a5f9-89c5f4ac8189', 'jp', '拡張現実での料理の3dモデルの表示');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('81ee526d-beb0-4a71-a192-e2b5a9886146', 'f1770524-4e1a-4b1f-8c90-4ccb386e0604', 'en', 'View restaurant menu by QR code');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('81ee526d-beb0-4a71-a192-e2b5a9886146', '2d6067ab-4ccb-4af9-ae4a-2c5162c6b208', 'en', 'View individual dishes, their description, photo, ingredients etc');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('81ee526d-beb0-4a71-a192-e2b5a9886146', 'fe5f26f8-978d-405b-8de7-6d7771223db4', 'en', 'Viewing a 3d model of a dish in augmented reality');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('81ee526d-beb0-4a71-a192-e2b5a9886146', '4790b388-e62c-4e2d-950e-21753ff1ae1f', 'ru', 'Просмотр меню ресторана по QR коду');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('81ee526d-beb0-4a71-a192-e2b5a9886146', '84c49399-d9e4-4a93-8696-b82f746a0960', 'ru', 'Просмотр отдельных блюд и их описание, фото, время готовки, ингридиенты');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('81ee526d-beb0-4a71-a192-e2b5a9886146', '16de11c1-43fc-43fc-99e1-1277535008c6', 'ru', 'Просмотр 3d модели блюда в дополненной реальности');
INSERT INTO photos (project_uuid, uuid, path) VALUES ('81ee526d-beb0-4a71-a192-e2b5a9886146', '9adaba7c-2473-43d5-8dd2-1b5e57fae05f', 'ewys/1.jpg');
INSERT INTO photos (project_uuid, uuid, path) VALUES ('81ee526d-beb0-4a71-a192-e2b5a9886146', '9a768b38-13cb-476d-bfe9-0b7cd9fb1885', 'ewys/2.jpg');
INSERT INTO photos (project_uuid, uuid, path) VALUES ('81ee526d-beb0-4a71-a192-e2b5a9886146', '179268ac-ea9f-4b00-a4de-a898f8b957f3', 'ewys/3.jpg');
INSERT INTO subtitles( project_uuid, uuid, lang, content) VALUES ('81ee526d-beb0-4a71-a192-e2b5a9886146', '73c49208-bf94-4ef7-9c91-33d48a1a3de8', 'en', 'On-screen menu with augmented reality for a restaurant');
INSERT INTO subtitles( project_uuid, uuid, lang, content) VALUES ('81ee526d-beb0-4a71-a192-e2b5a9886146', '8eaf72e7-a400-400a-a4ae-02ba7844ed06', 'ru', 'Меню с дополненной реальностью для ресторанов');
INSERT INTO subtitles( project_uuid, uuid, lang, content) VALUES ('81ee526d-beb0-4a71-a192-e2b5a9886146', '2eebd12b-8616-431c-a80d-a67ab48350f1', 'jp', 'レストランのための拡張現実と画面上のメニュー');


-- Project "BUSINESS UP"
INSERT INTO projects (uuid, photo_url, title, categories) VALUES ('0b1dc4ba-541c-49e2-8d67-46875a85ad9f', 'BISUP.jpg', 'BUSINESS UP', '2,4');
INSERT INTO cards (project_uuid,  uuid,  title,  sub_title) VALUES ('0b1dc4ba-541c-49e2-8d67-46875a85ad9f', '5ec414ad-c32b-4b68-a6e5-f3e1160f0b08', 'Front-end', 'Vue.js, VueRouter');
INSERT INTO cards (project_uuid,  uuid,  title,  sub_title) VALUES ('0b1dc4ba-541c-49e2-8d67-46875a85ad9f', 'd13a4a91-f260-46ba-bc39-2339c392ff79', 'Back-end', 'Python, Flask, MySql');
INSERT INTO cards (project_uuid,  uuid,  title,  sub_title) VALUES ('0b1dc4ba-541c-49e2-8d67-46875a85ad9f', '8272c77e-6d75-4797-8f4e-471f5785c95b', 'Mobile', 'ReactNative');
INSERT INTO descriptions (project_uuid, uuid, lang, content) VALUES ('0b1dc4ba-541c-49e2-8d67-46875a85ad9f', '6f73369f-f470-4587-927b-4f193d35c79e', 'en', 'The platform forms entrepreneurial skills by using online gaming solutions, building development, supporting the business community and participating in cyber championships.');
INSERT INTO descriptions (project_uuid, uuid, lang, content) VALUES ('0b1dc4ba-541c-49e2-8d67-46875a85ad9f', '3a279f3d-84cb-4cf3-80c1-be445c775288', 'ru', 'Платформа формирует навыки предпринимателя с помощью игровых онлайн решений, выстраивая траектории развития, поддержки бизнес-комьюнити и участия в киберчемпионатах.');
INSERT INTO descriptions (project_uuid, uuid, lang, content) VALUES ('0b1dc4ba-541c-49e2-8d67-46875a85ad9f', 'c44371a8-85ad-4a28-a2cb-c3c6ca4f2a27', 'jp', 'プラットフォームは、オンラインゲームのソリューションを使用して、開発を構築し、ビジネスコミュニティを支援し、サイバーシンショーに参加することにより、起業家のスキルを形成します。');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('0b1dc4ba-541c-49e2-8d67-46875a85ad9f', '422e6a32-5b44-4c04-b4d2-95ffbedc43f6', 'jp', '評価と評判の個人アカウント');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('0b1dc4ba-541c-49e2-8d67-46875a85ad9f', '911d8fae-855a-447f-a4e0-4dbb44f95a1a', 'jp', 'ビジネスゲームと選手権');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('0b1dc4ba-541c-49e2-8d67-46875a85ad9f', 'f4f6ffe0-4ca2-424d-aa54-321f35de9e6d', 'jp', '通信教育');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('0b1dc4ba-541c-49e2-8d67-46875a85ad9f', 'aac17b44-62a8-4da5-8641-e682b1ac30d0', 'jp', 'デジタルビジネスコミュニティ');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('0b1dc4ba-541c-49e2-8d67-46875a85ad9f', '368925cf-251e-452f-af5b-e96c35cca151', 'jp', '社会プロジェクト');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('0b1dc4ba-541c-49e2-8d67-46875a85ad9f', 'c8c7925d-aad6-45c9-ae5a-b427b93d6fc6', 'en', 'Personal Account with rating and reputation');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('0b1dc4ba-541c-49e2-8d67-46875a85ad9f', '6ad4cbd0-5b43-4e13-9643-346845ff070d', 'en', 'Business games and championships');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('0b1dc4ba-541c-49e2-8d67-46875a85ad9f', '6e123a43-d1ee-4ed5-bcfc-b4dea9660816', 'en', 'Distance learning');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('0b1dc4ba-541c-49e2-8d67-46875a85ad9f', 'bb9ae279-1b64-4e5e-aeab-aa7d284ea06d', 'en', 'Digital business community');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('0b1dc4ba-541c-49e2-8d67-46875a85ad9f', 'de35f574-8863-44e3-a25a-935780975588', 'en', 'Social Project');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('0b1dc4ba-541c-49e2-8d67-46875a85ad9f', 'ab8fef65-6e69-4f34-8381-476604dff28e', 'ru', 'Личный кабинет с рейтингом и репутацией');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('0b1dc4ba-541c-49e2-8d67-46875a85ad9f', 'dddcd6d2-d922-4bce-8a47-4c1f1ea90cfc', 'ru', 'Бизнес-игры и чемпионаты');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('0b1dc4ba-541c-49e2-8d67-46875a85ad9f', '96be2299-5c87-4899-b62b-f115fb814704', 'ru', 'Дистанционное обучение');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('0b1dc4ba-541c-49e2-8d67-46875a85ad9f', 'e49888e8-7515-4cbe-8e2f-248218d3bc0b', 'ru', 'Цифровое бизнес-коммьюнити');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('0b1dc4ba-541c-49e2-8d67-46875a85ad9f', '4cd9a3b9-dfcd-4ad3-9bbd-80d4be189a7c', 'ru', 'Социальный проект');
INSERT INTO photos (project_uuid, uuid, path) VALUES ('0b1dc4ba-541c-49e2-8d67-46875a85ad9f', '547c86d0-7f46-4f0a-b698-6b97b27e3a68', 'business-up/1.jpg');
INSERT INTO photos (project_uuid, uuid, path) VALUES ('0b1dc4ba-541c-49e2-8d67-46875a85ad9f', '3ca6b3c8-6bab-4ae0-9d47-17e284880470', 'business-up/2.jpg');
INSERT INTO photos (project_uuid, uuid, path) VALUES ('0b1dc4ba-541c-49e2-8d67-46875a85ad9f', 'b3b53bd6-f9a7-4352-9bfb-b14cfee67a36', 'business-up/3.jpg');
INSERT INTO subtitles( project_uuid, uuid, lang, content) VALUES ('0b1dc4ba-541c-49e2-8d67-46875a85ad9f', '35781533-1b23-47cf-818f-dcb26d0c44a8', 'en', 'The platform builds entrepreneurial skills through online gaming solutions.');
INSERT INTO subtitles( project_uuid, uuid, lang, content) VALUES ('0b1dc4ba-541c-49e2-8d67-46875a85ad9f', '55d8cca4-c7d4-416e-9578-4a06f6d9d2ad', 'ru', 'Платформа формирует навыки предпринимателя с помощью игровых онлайн решений.');
INSERT INTO subtitles( project_uuid, uuid, lang, content) VALUES ('0b1dc4ba-541c-49e2-8d67-46875a85ad9f', 'cb66c8a4-b302-42f6-8394-d5dbb584641e', 'jp', 'プラットフォームは、オンラインゲームのソリューションを通じて起業家のスキルを構築します。');


-- Project "OWSUP"
INSERT INTO projects (uuid, photo_url, title, categories) VALUES ('8cbad396-598e-435a-a225-822ec541531a', 'OWSUP.jpg', 'OWSUP', '2');
INSERT INTO cards (project_uuid,  uuid,  title,  sub_title) VALUES ('8cbad396-598e-435a-a225-822ec541531a', 'cf798042-37cc-41d1-a8e8-2972c2918501', 'Front-end', 'React, Redux Toolkit, Ant.d');
INSERT INTO cards (project_uuid,  uuid,  title,  sub_title) VALUES ('8cbad396-598e-435a-a225-822ec541531a', 'f9230697-f99d-4d4c-b97c-7992c5201da1', 'Back-end', 'GoLang, Gin, Gorm, PostgreSQL');
INSERT INTO descriptions (project_uuid, uuid, lang, content) VALUES ('8cbad396-598e-435a-a225-822ec541531a', '22557bd6-0c6c-4ac0-8325-3a3f14e72d20', 'en', 'Service for Ozon and Wildberries that helps to optimize sales');
INSERT INTO descriptions (project_uuid, uuid, lang, content) VALUES ('8cbad396-598e-435a-a225-822ec541531a', 'b52828ef-210d-4513-9bb7-1b00c076ed61', 'ru', 'Сервис для Ozon и Wildberries, который помогает оптимизировать продажи.');
INSERT INTO descriptions (project_uuid, uuid, lang, content) VALUES ('8cbad396-598e-435a-a225-822ec541531a', '0987f689-b3d9-4986-91dc-58790bc7b4cb', 'jp', '販売の最適化を支援するオゾンと野生の果実のためのサービス');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('8cbad396-598e-435a-a225-822ec541531a', '9da5e1af-aa42-4c97-a83a-c082b06d2251', 'jp', 'カードのコピー');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('8cbad396-598e-435a-a225-822ec541531a', '9c3f0640-d466-4a48-90f6-2fd81661a0ec', 'jp', '1つのダッシュボード内のすべての取引先の一般的な分析');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('8cbad396-598e-435a-a225-822ec541531a', '61b47eb1-26da-49d4-9633-06446ee2690a', 'jp', 'すべての取引先からの注文の分析');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('8cbad396-598e-435a-a225-822ec541531a', '22c492ce-02aa-44c8-9b3c-5eaa70122afe', 'jp', '配達のための商品の追加料金/手数料の計算機');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('8cbad396-598e-435a-a225-822ec541531a', '61ca5a9b-edf2-4d74-b355-d77be320f4e6', 'en', 'Copying cards');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('8cbad396-598e-435a-a225-822ec541531a', 'a6c1c7c9-ac19-4f2a-8fec-e84e028486c8', 'en', 'General analytics of all accounts in one Dashboard');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('8cbad396-598e-435a-a225-822ec541531a', '4e140f6a-8f04-4df7-bd74-172051643ad4', 'en', 'Analytics of orders from all accounts');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('8cbad396-598e-435a-a225-822ec541531a', 'adce891d-544c-4814-b179-d291e1227125', 'en', 'Calculator of surcharge / commission of goods for delivery');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('8cbad396-598e-435a-a225-822ec541531a', '88ecda00-ea9a-4949-8964-cc07527da543', 'ru', 'Копирование карточек');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('8cbad396-598e-435a-a225-822ec541531a', '5b4cb4a7-fd4f-4483-9da0-0f8157ca1505', 'ru', 'Общая аналитика всех кабинетов в одном Dashboard');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('8cbad396-598e-435a-a225-822ec541531a', 'ebf6c0d6-27d2-4bd6-9e5e-9250fab95fe3', 'ru', 'Аналитика заказов со всех кабинетов');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('8cbad396-598e-435a-a225-822ec541531a', '252e3d86-f715-403c-aca3-be9889762f14', 'ru', 'Калькулятор прибыли и комиссии товара за доставку');
INSERT INTO photos (project_uuid, uuid, path) VALUES ('8cbad396-598e-435a-a225-822ec541531a', 'b29a4b71-b104-4588-90f2-0b7fd52f3ac5', 'owsup/1.jpg');
INSERT INTO photos (project_uuid, uuid, path) VALUES ('8cbad396-598e-435a-a225-822ec541531a', 'c5058902-e094-431a-9ea4-52aafbd713a5', 'owsup/2.jpg');
INSERT INTO photos (project_uuid, uuid, path) VALUES ('8cbad396-598e-435a-a225-822ec541531a', '978aad4d-016f-4238-9541-f35ea032125d', 'owsup/3.jpg');
INSERT INTO subtitles( project_uuid, uuid, lang, content) VALUES ('8cbad396-598e-435a-a225-822ec541531a', '235e2a74-16a7-41fb-8156-ea464c9a6892', 'en', 'Service for selis for Ozon and Wildberries');
INSERT INTO subtitles( project_uuid, uuid, lang, content) VALUES ('8cbad396-598e-435a-a225-822ec541531a', '3bf65756-a00b-44d5-b841-9fd388f7ee40', 'ru', 'Сервис помощник продовцов на Ozon и Wildberries');
INSERT INTO subtitles( project_uuid, uuid, lang, content) VALUES ('8cbad396-598e-435a-a225-822ec541531a', 'dbd56c19-588f-4d20-9b9e-59db786d164d', 'jp', 'オゾンと野生の果実のための販売のためのサービス');


-- Project "EPICHERISION"
INSERT INTO projects (uuid, photo_url, title, categories) VALUES ('aec0435f-9ffe-4eed-9f09-2922b70cae16', 'EPICHERISION.jpg', 'EPICHERISION', '3');
INSERT INTO cards (project_uuid,  uuid,  title,  sub_title) VALUES ('aec0435f-9ffe-4eed-9f09-2922b70cae16', 'd921123b-4a0c-48e0-aded-7f3f62b072a5', 'Bot', 'NodeJs, node-html-parser');
INSERT INTO descriptions (project_uuid, uuid, lang, content) VALUES ('aec0435f-9ffe-4eed-9f09-2922b70cae16', '3e60875b-3128-4c65-b313-193224336a11', 'en', 'The main focus of the bot is to provide the fastest and most complete information about new arrivals in a number of stores selected by the customer for certain categories of goods.');
INSERT INTO descriptions (project_uuid, uuid, lang, content) VALUES ('aec0435f-9ffe-4eed-9f09-2922b70cae16', '05dd33c8-86cf-4532-9945-03a0aa8bd646', 'ru', 'Discord bot, задача которого предоставлять информацию о поступлении новых товаров.');
INSERT INTO descriptions (project_uuid, uuid, lang, content) VALUES ('aec0435f-9ffe-4eed-9f09-2922b70cae16', 'bac1eb66-6083-4faf-9c44-e7ef2a769eaf', 'jp', 'ボットの主な焦点は、商品の特定のカテゴリのために顧客が選択した店舗の数での新着に関する最速かつ最も完全な情報を提供することです。');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('aec0435f-9ffe-4eed-9f09-2922b70cae16', 'cafc2edf-be64-412f-9947-1d9cb13492be', 'jp', '実装の過程で、ATKリンクを生成するために必要な、通常のデータとメタの両方の多数のパーサーが書かれました');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('aec0435f-9ffe-4eed-9f09-2922b70cae16', '931b1c11-4c22-4922-8aac-51c0360b6934', 'jp', 'ユーザーに送信する製品を選択するためのキーワードとカテゴリを編集する機能を実装しました');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('aec0435f-9ffe-4eed-9f09-2922b70cae16', '1c72362b-05eb-4a8f-8d79-27f1aa057709', 'jp', '配送はチャネルに適切に分割され、各店舗の配送は別々のチャネルで行われます。 そして、それは店のフィードに新製品が登場した後、即座に起こります');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('aec0435f-9ffe-4eed-9f09-2922b70cae16', '1a93c22f-5db6-4606-8336-49a70f41aa20', 'jp', 'これとは別に、Nikeのatkリンクの生成は、管理者によって活性化されると実装されます。');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('aec0435f-9ffe-4eed-9f09-2922b70cae16', '82997810-7fbc-461a-ac79-5608c9159f61', 'en', 'In the process of implementation, a large number of parsers were written, both ordinary data and meta, necessary for generating ATK links');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('aec0435f-9ffe-4eed-9f09-2922b70cae16', '4ae05d3a-d789-495c-ba1c-dd5f1779994a', 'en', 'Implemented the ability to edit keywords and categories for selecting products to send to users');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('aec0435f-9ffe-4eed-9f09-2922b70cae16', '2badff0e-061d-41d5-b879-01bb90ea97af', 'en', 'Shipping is appropriately divided into channels, and shipping for each store occurs in a separate channel. And it happens instantly, after the appearance of new products in the store''s feed');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('aec0435f-9ffe-4eed-9f09-2922b70cae16', '5edf750e-e11d-4498-97eb-6a0e21971f6e', 'en', 'Separately, the generation of atk links for Nike is implemented, upon activation by the administrator.');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('aec0435f-9ffe-4eed-9f09-2922b70cae16', 'b928a645-68cd-419a-9fa5-ad64f964807a', 'ru', 'В процессе реализации было написано большое количество парсеров, как обычных данных так и мета, необходимых для генерации АТК ссылок');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('aec0435f-9ffe-4eed-9f09-2922b70cae16', 'be046d26-2a20-4264-a351-a09d9fc032d3', 'ru', 'Реализованная возможность редактирования ключевых слов и категорий для выборки товаров для отправки пользователям');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('aec0435f-9ffe-4eed-9f09-2922b70cae16', 'fa2d08c9-d8be-40dc-aa7d-d17404777f0f', 'ru', 'Отправка соответствующе разделена на каналы, и отправка по каждому магазину происходит в отдельный канал.');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('aec0435f-9ffe-4eed-9f09-2922b70cae16', 'ff2b2058-a94f-42e1-a7c9-854f4bf11a8e', 'ru', 'Отдельно реализована генерация атк ссылок для Nike, по активации администратором.');
INSERT INTO photos (project_uuid, uuid, path) VALUES ('aec0435f-9ffe-4eed-9f09-2922b70cae16', 'ecfa7f5b-b228-4cfb-82ef-78ddf2adeb0a', 'epicherision/1.jpg');
INSERT INTO photos (project_uuid, uuid, path) VALUES ('aec0435f-9ffe-4eed-9f09-2922b70cae16', '4fc3121b-a5f2-4909-a890-6e7cf59a4bea', 'epicherision/2.jpg');
INSERT INTO photos (project_uuid, uuid, path) VALUES ('aec0435f-9ffe-4eed-9f09-2922b70cae16', 'aee58227-a1e6-479c-a6f9-52ab53516f67', 'epicherision/3.jpg');
INSERT INTO subtitles( project_uuid, uuid, lang, content) VALUES ('aec0435f-9ffe-4eed-9f09-2922b70cae16', 'a349eabd-febc-4112-8a2d-9db2d694f4e9', 'en', 'Bot for Discord server');
INSERT INTO subtitles( project_uuid, uuid, lang, content) VALUES ('aec0435f-9ffe-4eed-9f09-2922b70cae16', '15dd53f4-bc75-4741-be82-e850541cf8d4', 'ru', 'Бот для Discrod сервера.');
INSERT INTO subtitles( project_uuid, uuid, lang, content) VALUES ('aec0435f-9ffe-4eed-9f09-2922b70cae16', '13b18305-edfe-426e-aced-39e688ca4369', 'jp', '不和サーバーのためのボット');


-- Project "Just Portfolio"
INSERT INTO projects (uuid, photo_url, title, categories) VALUES ('57fe52eb-04d2-4d09-8d9d-29af4f916ef7', 'just-portfolio.jpg', 'Just Portfolio', '2');
INSERT INTO cards (project_uuid,  uuid,  title,  sub_title) VALUES ('57fe52eb-04d2-4d09-8d9d-29af4f916ef7', 'd4391570-0fa3-43da-99c2-8e2abc5be67f', 'Front-end', 'React, Redux ToolKit');
INSERT INTO cards (project_uuid,  uuid,  title,  sub_title) VALUES ('57fe52eb-04d2-4d09-8d9d-29af4f916ef7', '05aa7f76-3afc-4a70-9772-3374b9fa4613', 'Back-end', 'GoLang, Gin, Gorm, PostgreSQL');
INSERT INTO descriptions (project_uuid, uuid, lang, content) VALUES ('57fe52eb-04d2-4d09-8d9d-29af4f916ef7', '7c2e05da-1916-4c37-adf3-c8b710b9132c', 'en', 'A highly focused portfolio content management system on GoLang');
INSERT INTO descriptions (project_uuid, uuid, lang, content) VALUES ('57fe52eb-04d2-4d09-8d9d-29af4f916ef7', '875c9f43-22bc-4494-bbd9-7873e63b3e57', 'ru', 'Узкоспециализированная CMS для портфолио, написанная на GoLang.');
INSERT INTO descriptions (project_uuid, uuid, lang, content) VALUES ('57fe52eb-04d2-4d09-8d9d-29af4f916ef7', 'e2a2d537-fb70-4b2f-9925-05daabfcc7fc', 'jp', 'GoLangの非常に焦点を当てたポートフォリオコンテンツマネジメントシステム');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('57fe52eb-04d2-4d09-8d9d-29af4f916ef7', '00d5b3f8-47c7-488b-bfc7-91967faf5d0a', 'jp', 'あなたは良い品質でプロジェクトの画像を保存することができます');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('57fe52eb-04d2-4d09-8d9d-29af4f916ef7', '7496cb91-00ee-4c43-a95c-618bdf01d4bf', 'jp', 'あなたのサイトの管理パネルとしてサービスを使用することができます');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('57fe52eb-04d2-4d09-8d9d-29af4f916ef7', '10ff5899-53f7-47c3-83b7-4c85d619be6f', 'en', 'Allows you to store images for projects in good quality');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('57fe52eb-04d2-4d09-8d9d-29af4f916ef7', '6cac3fcd-3525-486e-800a-d7ba3aa70734', 'en', 'Allows you to use the service as an admin panel for your site');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('57fe52eb-04d2-4d09-8d9d-29af4f916ef7', 'a33200f2-6435-451a-8476-41426cbe5509', 'ru', 'Позволяет хранить изображения для проектов в хорошем качестве');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('57fe52eb-04d2-4d09-8d9d-29af4f916ef7', 'aca562aa-0e64-400e-b8d1-cd765e3d0ed5', 'ru', 'Возможность использовать сервис как админ панель к вашему сайту');
INSERT INTO photos (project_uuid, uuid, path) VALUES ('57fe52eb-04d2-4d09-8d9d-29af4f916ef7', '09b43498-60fe-44f4-8991-053c1ce701bf', 'just-portfolio/1.jpg');
INSERT INTO photos (project_uuid, uuid, path) VALUES ('57fe52eb-04d2-4d09-8d9d-29af4f916ef7', '14c58f76-fd00-4cd8-8f26-c465f98677b7', 'just-portfolio/2.jpg');
INSERT INTO photos (project_uuid, uuid, path) VALUES ('57fe52eb-04d2-4d09-8d9d-29af4f916ef7', 'c3236163-fa4d-4d23-8898-aa79fab967ff', 'just-portfolio/3.jpg');
INSERT INTO subtitles( project_uuid, uuid, lang, content) VALUES ('57fe52eb-04d2-4d09-8d9d-29af4f916ef7', '26edd190-decf-4e0b-a678-e9910f933175', 'en', 'A highly focused portfolio content management system');
INSERT INTO subtitles( project_uuid, uuid, lang, content) VALUES ('57fe52eb-04d2-4d09-8d9d-29af4f916ef7', '76e449cd-86d3-49fc-b207-316a23bd7b68', 'ru', 'Узкоспециализированная CMS для портфолио');
INSERT INTO subtitles( project_uuid, uuid, lang, content) VALUES ('57fe52eb-04d2-4d09-8d9d-29af4f916ef7', '42ff4f27-ed88-4a78-a245-5ac55160abb7', 'jp', '高度に焦点を当てたポートフォリオコンテンツ管理システム');


-- Project "EMIAS"
INSERT INTO projects (uuid, photo_url, title, categories) VALUES ('f259e99b-4722-4646-9c48-0de63e6beed4', 'EMIAS.jpg', 'EMIAS', '2');
INSERT INTO cards (project_uuid,  uuid,  title,  sub_title) VALUES ('f259e99b-4722-4646-9c48-0de63e6beed4', 'a70cbf0d-78fb-4c16-9201-d8edc5c470b4', 'Front-end', 'Vue, Vue Router');
INSERT INTO cards (project_uuid,  uuid,  title,  sub_title) VALUES ('f259e99b-4722-4646-9c48-0de63e6beed4', '2b98d3d8-e6a3-46fd-9335-e45e2b592935', 'Back-end', 'NodeJs, Express, MySQL');
INSERT INTO descriptions (project_uuid, uuid, lang, content) VALUES ('f259e99b-4722-4646-9c48-0de63e6beed4', 'cf87985b-81ec-45be-93cf-9e5420035f74', 'en', 'Web platform for EMIAS emploees.');
INSERT INTO descriptions (project_uuid, uuid, lang, content) VALUES ('f259e99b-4722-4646-9c48-0de63e6beed4', '9eb02f57-750b-4e35-93ae-cc4f22aebe80', 'ru', 'Веб-платформа сотрудников компании EMIAS, которая предоставляет возможность удобно выполнять задачи и смотреть актуальный статус задач.');
INSERT INTO descriptions (project_uuid, uuid, lang, content) VALUES ('f259e99b-4722-4646-9c48-0de63e6beed4', '8a21924e-1383-4016-b062-daadd6d2c230', 'jp', '従業員としてのEMIのためのWebプラットフォーム。');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('f259e99b-4722-4646-9c48-0de63e6beed4', 'f373bf4f-3fde-47ea-973f-815ff3115499', 'jp', '従業員のための個人アカウント');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('f259e99b-4722-4646-9c48-0de63e6beed4', '1e1d3b79-6407-49bb-b882-99e5068ddacc', 'jp', '参加者が自分のアイデアを提出する機会');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('f259e99b-4722-4646-9c48-0de63e6beed4', 'c5d2fb1f-0122-4d8d-803b-7517cd98fa75', 'jp', 'チームの進捗状況を表示する機能');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('f259e99b-4722-4646-9c48-0de63e6beed4', '3d84e2bf-080a-485d-98b0-400873f74281', 'jp', 'それらに値するユーザーにバッジを与える能力');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('f259e99b-4722-4646-9c48-0de63e6beed4', '85ca6d8d-d7b9-419a-ab9b-2839ed1a072a', 'en', 'Personal account for employees');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('f259e99b-4722-4646-9c48-0de63e6beed4', '0ad6f8e7-39fc-452d-a2e3-c40b51006b58', 'en', 'Opportunity for participants to submit their ideas');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('f259e99b-4722-4646-9c48-0de63e6beed4', '64246201-3021-4236-b421-d307eaac3a0a', 'en', 'Ability to view team progress');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('f259e99b-4722-4646-9c48-0de63e6beed4', '1de6c9e3-f7c1-4942-8465-5451f41ea9b5', 'en', 'Ability to give badges to users who deserve them');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('f259e99b-4722-4646-9c48-0de63e6beed4', 'c7bcd75c-312a-4284-abb1-c287bb605d5b', 'ru', 'Личный кабинет для сотрудников');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('f259e99b-4722-4646-9c48-0de63e6beed4', '96f96080-69c4-431b-9a7b-71056003a534', 'ru', 'Возможность участникам предлогать свои идеи');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('f259e99b-4722-4646-9c48-0de63e6beed4', '537fc79d-e7f5-4564-9cee-9c6c7dfbeb4d', 'ru', 'Возможность просматривать прогресс команды');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('f259e99b-4722-4646-9c48-0de63e6beed4', '33f3e803-25fc-4257-ac4c-de9fba97b4f9', 'ru', 'Возможность дать значки пользователям которые их заслуживают');
INSERT INTO photos (project_uuid, uuid, path) VALUES ('f259e99b-4722-4646-9c48-0de63e6beed4', '00f587db-1b45-4ca4-a636-4bd7246af1d1', 'emias/1.jpg');
INSERT INTO photos (project_uuid, uuid, path) VALUES ('f259e99b-4722-4646-9c48-0de63e6beed4', '2f983c19-0084-42ac-800e-9c920b609a01', 'emias/2.jpg');
INSERT INTO photos (project_uuid, uuid, path) VALUES ('f259e99b-4722-4646-9c48-0de63e6beed4', '3f55ef07-7c3d-4b4a-8ab4-f67ada1abdee', 'emias/3.jpg');
INSERT INTO subtitles( project_uuid, uuid, lang, content) VALUES ('f259e99b-4722-4646-9c48-0de63e6beed4', '1a11e42c-f7f4-4b5e-81db-ea35ab8ef818', 'en', 'web platform for EMIAS emploees');
INSERT INTO subtitles( project_uuid, uuid, lang, content) VALUES ('f259e99b-4722-4646-9c48-0de63e6beed4', 'cb4b55eb-326c-4401-9628-0127ed55e741', 'ru', 'Веб платформа для сотрудников компании EMIAS');
INSERT INTO subtitles( project_uuid, uuid, lang, content) VALUES ('f259e99b-4722-4646-9c48-0de63e6beed4', '3ea834af-cf08-4ba2-88f4-c9da88aefd66', 'jp', '従業員としてのEMIのためのwebプラットフォーム');


-- Project "U.Business"
INSERT INTO projects (uuid, photo_url, title, categories) VALUES ('cde03dbb-30ff-4704-91d7-20d8466159c1', 'UBusiness.jpg', 'U.Business', '2');
INSERT INTO cards (project_uuid,  uuid,  title,  sub_title) VALUES ('cde03dbb-30ff-4704-91d7-20d8466159c1', '6eb05bdd-7c24-4cfc-8d59-10d7720219b1', 'Front-end', 'NextJs, i18n');
INSERT INTO descriptions (project_uuid, uuid, lang, content) VALUES ('cde03dbb-30ff-4704-91d7-20d8466159c1', '411839e3-7663-47e7-b74f-51dd8618ac22', 'en', 'Lending created on next.js for a company. With admin panel for text editing');
INSERT INTO descriptions (project_uuid, uuid, lang, content) VALUES ('cde03dbb-30ff-4704-91d7-20d8466159c1', '1daf8e4a-396a-48c7-a0c8-e3064c5926b9', 'ru', 'Сайт созданный на next.js для компании. С админкой для редактирования текста');
INSERT INTO descriptions (project_uuid, uuid, lang, content) VALUES ('cde03dbb-30ff-4704-91d7-20d8466159c1', '26d76502-bbfa-44b9-9bd8-1fec87a1dfc6', 'jp', '融資は次の上に作成しました。会社のためのjs。 テキスト編集のための管理者パネル付き');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('cde03dbb-30ff-4704-91d7-20d8466159c1', 'd1913334-43bb-43af-8fd8-2be8076f3de1', 'jp', '多言語化はi18nを使用して実装されています');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('cde03dbb-30ff-4704-91d7-20d8466159c1', '948b79a5-f423-4d6b-af11-033027e975ab', 'jp', 'あなたが管理者であれば、サイト上で直接テキスト編集');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('cde03dbb-30ff-4704-91d7-20d8466159c1', 'b49e85f4-0af2-4402-bd2b-3e7a76a295f4', 'en', 'Text editing directly on the site if you are an admin');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('cde03dbb-30ff-4704-91d7-20d8466159c1', '4e6eedb9-ac0a-44c4-9ce3-79719b533325', 'en', 'Multilingualism is implemented using i18n');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('cde03dbb-30ff-4704-91d7-20d8466159c1', '4e7067b3-c72c-45af-afe1-93f3ca0c7ec0', 'ru', 'Админ панель, позволяющая редактировать текст');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('cde03dbb-30ff-4704-91d7-20d8466159c1', '398fbe68-fddb-4e49-9b87-ab9adc784ad1', 'ru', 'Реализована мультиязычность с помощью i18n');
INSERT INTO photos (project_uuid, uuid, path) VALUES ('cde03dbb-30ff-4704-91d7-20d8466159c1', '694d1b35-3137-486f-8339-a812aa0931f1', 'u-business/1.jpg');
INSERT INTO photos (project_uuid, uuid, path) VALUES ('cde03dbb-30ff-4704-91d7-20d8466159c1', '5c0d0412-036e-45dd-aef5-7345c51e5cf1', 'u-business/2.jpg');
INSERT INTO photos (project_uuid, uuid, path) VALUES ('cde03dbb-30ff-4704-91d7-20d8466159c1', '25d5472d-507a-4b9c-8f6d-5026e45d0e89', 'u-business/3.jpg');
INSERT INTO subtitles( project_uuid, uuid, lang, content) VALUES ('cde03dbb-30ff-4704-91d7-20d8466159c1', '85803eff-ec2f-4cc3-a8d7-54d0f261f062', 'en', 'UBusiness lending with multilang');
INSERT INTO subtitles( project_uuid, uuid, lang, content) VALUES ('cde03dbb-30ff-4704-91d7-20d8466159c1', '6a2971ef-5958-465e-a007-f60f3f0232b0', 'ru', 'UBusiness сайт с мультиязычностью');
INSERT INTO subtitles( project_uuid, uuid, lang, content) VALUES ('cde03dbb-30ff-4704-91d7-20d8466159c1', 'e734c423-baa5-44a1-aea4-ab41adf921a8', 'jp', 'UBusiness 貸出');


-- Project "Secret Santa"
INSERT INTO projects (uuid, photo_url, title, categories) VALUES ('214d486e-0b5c-4f19-8a25-7399cf7bc18c', 'secret-santa/3.jpg', 'Secret Santa', '2');
INSERT INTO cards (project_uuid,  uuid,  title,  sub_title) VALUES ('214d486e-0b5c-4f19-8a25-7399cf7bc18c', 'e6549c48-7f2d-4bb8-aee1-b0c15fec5b57', 'Front-end', 'Vue 2, VueRouter');
INSERT INTO cards (project_uuid,  uuid,  title,  sub_title) VALUES ('214d486e-0b5c-4f19-8a25-7399cf7bc18c', '5d55dce5-df4a-4f72-9241-fdf2dee05b4b', 'Back-end', 'Python 3, Flask, MySql');
INSERT INTO descriptions (project_uuid, uuid, lang, content) VALUES ('214d486e-0b5c-4f19-8a25-7399cf7bc18c', '23522334-0a59-4967-8b74-751109d915b7', 'en', 'Secret Santa for company croc');
INSERT INTO descriptions (project_uuid, uuid, lang, content) VALUES ('214d486e-0b5c-4f19-8a25-7399cf7bc18c', 'fefe128f-6d49-4a1a-af76-c2aac40cb0c8', 'ru', 'Игра "Тайный Санта" для компании croc. Традиционная рождественская игра, целью которой является анонимный обмен подарками в группе играющих людей');
INSERT INTO descriptions (project_uuid, uuid, lang, content) VALUES ('214d486e-0b5c-4f19-8a25-7399cf7bc18c', '05129bd3-eab4-47f4-a347-59993315a3e5', 'jp', '会社のcrocのための秘密のサンタ');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('214d486e-0b5c-4f19-8a25-7399cf7bc18c', '036b70dd-a4b9-44ac-91bd-58204c57081d', 'jp', '異なる専門分野と部門を持つペアを作成するアルゴリズム');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('214d486e-0b5c-4f19-8a25-7399cf7bc18c', 'e027e3bc-4bf8-4cbb-9298-0319d677a47f', 'jp', 'メールをメールに送信する');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('214d486e-0b5c-4f19-8a25-7399cf7bc18c', '971a969f-e612-4d23-8527-df6f2551dced', 'jp', 'アカウント内のすべての機能');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('214d486e-0b5c-4f19-8a25-7399cf7bc18c', '2956e06e-f43c-4e71-ad99-b0cd34776417', 'en', 'An algorithm that creates pairs with different specializations and departments');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('214d486e-0b5c-4f19-8a25-7399cf7bc18c', 'd3bc1eb4-ef21-4ba1-a7ef-4b50c4850800', 'en', 'Sending emails to mail');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('214d486e-0b5c-4f19-8a25-7399cf7bc18c', 'f24d2c04-d47b-49f2-8263-e9f8fdcffe67', 'en', 'All features in your account');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('214d486e-0b5c-4f19-8a25-7399cf7bc18c', '9f506e01-5959-4039-88ee-5d6046cbe560', 'ru', 'Алгоритм который создаёт пары, с разними специализациями и отделами');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('214d486e-0b5c-4f19-8a25-7399cf7bc18c', '96a424e9-e5bd-4ee7-933e-dcd4b05e9e14', 'ru', 'Рассылка писем на почту');
INSERT INTO features (project_uuid, uuid, lang, content) VALUES ('214d486e-0b5c-4f19-8a25-7399cf7bc18c', 'b251bcae-06ab-44e8-a718-0df7fbf2ec10', 'ru', 'Все функции в личном кабинете');
INSERT INTO photos (project_uuid, uuid, path) VALUES ('214d486e-0b5c-4f19-8a25-7399cf7bc18c', '4d022237-2e3c-4e9b-b05b-0f848776e9c3', 'secret-santa/1.jpg');
INSERT INTO photos (project_uuid, uuid, path) VALUES ('214d486e-0b5c-4f19-8a25-7399cf7bc18c', '5268b470-9b65-4737-bfd0-ded05af463a1', 'secret-santa/2.jpg');
INSERT INTO photos (project_uuid, uuid, path) VALUES ('214d486e-0b5c-4f19-8a25-7399cf7bc18c', '0c955ac1-4a30-4ad8-b632-a7329ec5b651', 'secret-santa/3.jpg');
INSERT INTO subtitles( project_uuid, uuid, lang, content) VALUES ('214d486e-0b5c-4f19-8a25-7399cf7bc18c', '2a97a01e-63b7-4807-b088-5143fbad6671', 'en', 'Secret Santa for company croc');
INSERT INTO subtitles( project_uuid, uuid, lang, content) VALUES ('214d486e-0b5c-4f19-8a25-7399cf7bc18c', 'bee2e9bd-16d5-48c7-ab05-48763fc2f77a', 'ru', 'Игра "Тайный Санта" для компании croc');
INSERT INTO subtitles( project_uuid, uuid, lang, content) VALUES ('214d486e-0b5c-4f19-8a25-7399cf7bc18c', '83212a20-80ca-4848-a429-2a40abf56964', 'jp', '会社のcrocのための秘密のサンタ');
