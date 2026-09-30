/* ============================================================
   ConverterHub — common.js v2.0
   Persistent dark mode, multilingual, header, footer, cookie
   ============================================================ */

// ── THEME — applied IMMEDIATELY to prevent flash ────────────
(function() {
  var t = localStorage.getItem('ch_theme');
  if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
    document.body && document.body.classList.add('dark');
  }
})();

// ── TRANSLATIONS ────────────────────────────────────────────
const LANGS = {
  en: {
    code:'en', name:'English', flag:'🇬🇧', dir:'ltr',
    nav_home:'Home', nav_file:'File Tools', nav_geo:'Geospatial Tools',
    nav_conv:'Converters', nav_all:'All Tools', nav_blog:'Blog',
    nav_help:'Help', nav_about:'About', nav_contact:'Contact',
    hero_badge:'100% Free • No Signup • No Limits',
    hero_title:'All Your Conversions.\nSimple. Fast.',
    hero_free:'Free.',
    hero_desc:'ConverterHub provides free online tools for file, image, document, coordinate and unit conversions. No signup. No limits.',
    hero_explore:'Explore Tools',
    hero_how:'How It Works',
    upload_title:'Drag & drop your file here',
    upload_or:'or',
    upload_browse:'click to browse',
    upload_formats:'Supports 200+ file formats',
    popular:'Popular Tools',
    view_all:'View all tools →',
    browse_cat:'Browse Tools By Category',
    how_works:'How It Works',
    how_1_title:'Choose a tool',
    how_1_desc:'Select the tool you need from our collection.',
    how_2_title:'Upload or input',
    how_2_desc:'Upload your file or enter the data required.',
    how_3_title:'Convert',
    how_3_desc:'We process your file instantly and securely.',
    how_4_title:'Download result',
    how_4_desc:'Download your converted file or view the results.',
    trust_title:'Trusted by users worldwide',
    trust_desc:'ConverterHub is used by students, professionals and businesses in 190+ countries.',
    footer_tagline:'All your conversions. Simple. Fast. Free. Powerful online tools for everyday needs.',
    footer_tools:'Tools', footer_resources:'Resources', footer_company:'Company',
    footer_legal:'Legal', footer_languages:'Languages',
    footer_file:'File Tools', footer_geo:'Geospatial Tools',
    footer_image:'Image Tools', footer_conv:'Converters', footer_all:'All Tools',
    footer_blog:'Blog', footer_help:'Help Center', footer_how:'How It Works',
    footer_faq:'FAQ', footer_suggest:'Suggest a Tool',
    footer_about:'About Us', footer_contact:'Contact Us',
    footer_privacy:'Privacy Policy', footer_terms:'Terms of Service',
    footer_cookie:'Cookie Policy', footer_copy:'© 2026 ConverterHub. All rights reserved.',
    cookie_msg:'We use cookies and Google AdSense to serve ads and analyse traffic.',
    cookie_accept:'Accept All', cookie_decline:'Decline',
    btn_convert:'Convert', btn_download:'Download', btn_reset:'Convert Another',
    btn_copy:'Copy', btn_close:'Close',
    progress:'Processing...', success:'Done!',
    err_file:'Please upload a file first.',
    err_size:'File too large.',
    err_format:'Unsupported file format.',
    lang_select:'Select Language',
  },
  fr: {
    code:'fr', name:'Français', flag:'🇫🇷', dir:'ltr',
    nav_home:'Accueil', nav_file:'Outils Fichiers', nav_geo:'Outils Géospatiaux',
    nav_conv:'Convertisseurs', nav_all:'Tous les Outils', nav_blog:'Blog',
    nav_help:'Aide', nav_about:'À propos', nav_contact:'Contact',
    hero_badge:'100% Gratuit • Sans Inscription • Sans Limites',
    hero_title:'Toutes vos Conversions.\nSimples. Rapides.',
    hero_free:'Gratuites.',
    hero_desc:'ConverterHub offre des outils gratuits pour la conversion de fichiers, images et coordonnées. Sans inscription. Sans limites.',
    hero_explore:'Explorer les Outils',
    hero_how:'Comment ça marche',
    upload_title:'Glissez et déposez votre fichier ici',
    upload_or:'ou',
    upload_browse:'cliquez pour parcourir',
    upload_formats:'Supporte plus de 200 formats',
    popular:'Outils Populaires', view_all:'Voir tous les outils →',
    browse_cat:'Parcourir par Catégorie', how_works:'Comment ça marche',
    how_1_title:'Choisir un outil', how_1_desc:"Sélectionnez l'outil dont vous avez besoin.",
    how_2_title:'Télécharger ou saisir', how_2_desc:'Téléchargez votre fichier ou saisissez les données.',
    how_3_title:'Convertir', how_3_desc:'Nous traitons votre fichier instantanément.',
    how_4_title:'Télécharger le résultat', how_4_desc:'Téléchargez votre fichier converti.',
    trust_title:'Utilisé dans le monde entier',
    trust_desc:'ConverterHub est utilisé par des étudiants et professionnels dans 190+ pays.',
    footer_tagline:'Toutes vos conversions. Simples. Rapides. Gratuites.',
    footer_tools:'Outils', footer_resources:'Ressources', footer_company:'Société',
    footer_legal:'Légal', footer_languages:'Langues',
    footer_file:'Outils Fichiers', footer_geo:'Outils Géospatiaux',
    footer_image:'Outils Image', footer_conv:'Convertisseurs', footer_all:'Tous les Outils',
    footer_blog:'Blog', footer_help:'Centre d\'aide', footer_how:'Comment ça marche',
    footer_faq:'FAQ', footer_suggest:'Suggérer un Outil',
    footer_about:'À propos', footer_contact:'Nous contacter',
    footer_privacy:'Politique de confidentialité', footer_terms:'Conditions d\'utilisation',
    footer_cookie:'Politique des cookies', footer_copy:'© 2026 ConverterHub. Tous droits réservés.',
    cookie_msg:'Nous utilisons des cookies et Google AdSense pour les publicités.',
    cookie_accept:'Tout accepter', cookie_decline:'Refuser',
    btn_convert:'Convertir', btn_download:'Télécharger', btn_reset:'Nouvelle conversion',
    btn_copy:'Copier', btn_close:'Fermer',
    progress:'Traitement...', success:'Terminé!',
    err_file:'Veuillez d\'abord télécharger un fichier.',
    err_size:'Fichier trop volumineux.', err_format:'Format non supporté.',
    lang_select:'Choisir la langue',
  },
  es: {
    code:'es', name:'Español', flag:'🇪🇸', dir:'ltr',
    nav_home:'Inicio', nav_file:'Herramientas', nav_geo:'Herramientas Geoespaciales',
    nav_conv:'Conversores', nav_all:'Todas las Herramientas', nav_blog:'Blog',
    nav_help:'Ayuda', nav_about:'Acerca de', nav_contact:'Contacto',
    hero_badge:'100% Gratis • Sin Registro • Sin Límites',
    hero_title:'Todas tus Conversiones.\nSimples. Rápidas.',
    hero_free:'Gratis.',
    hero_desc:'ConverterHub ofrece herramientas gratuitas para convertir archivos, imágenes y coordenadas. Sin registro. Sin límites.',
    hero_explore:'Explorar Herramientas', hero_how:'Cómo Funciona',
    upload_title:'Arrastra y suelta tu archivo aquí', upload_or:'o',
    upload_browse:'haz clic para buscar', upload_formats:'Soporta 200+ formatos',
    popular:'Herramientas Populares', view_all:'Ver todas →',
    browse_cat:'Navegar por Categoría', how_works:'Cómo Funciona',
    how_1_title:'Elige una herramienta', how_1_desc:'Selecciona la herramienta que necesitas.',
    how_2_title:'Sube o introduce', how_2_desc:'Sube tu archivo o introduce los datos.',
    how_3_title:'Convierte', how_3_desc:'Procesamos tu archivo al instante.',
    how_4_title:'Descarga el resultado', how_4_desc:'Descarga tu archivo convertido.',
    trust_title:'Confiado por usuarios en todo el mundo',
    trust_desc:'ConverterHub es usado por estudiantes y profesionales en 190+ países.',
    footer_tagline:'Todas tus conversiones. Simples. Rápidas. Gratis.',
    footer_tools:'Herramientas', footer_resources:'Recursos', footer_company:'Empresa',
    footer_legal:'Legal', footer_languages:'Idiomas',
    footer_file:'Herramientas Archivo', footer_geo:'Herramientas Geoespaciales',
    footer_image:'Herramientas Imagen', footer_conv:'Conversores', footer_all:'Todas',
    footer_blog:'Blog', footer_help:'Centro de ayuda', footer_how:'Cómo funciona',
    footer_faq:'Preguntas frecuentes', footer_suggest:'Sugerir herramienta',
    footer_about:'Acerca de', footer_contact:'Contáctanos',
    footer_privacy:'Política de privacidad', footer_terms:'Términos de servicio',
    footer_cookie:'Política de cookies', footer_copy:'© 2026 ConverterHub. Todos los derechos reservados.',
    cookie_msg:'Usamos cookies y Google AdSense para anuncios.',
    cookie_accept:'Aceptar todo', cookie_decline:'Rechazar',
    btn_convert:'Convertir', btn_download:'Descargar', btn_reset:'Nueva conversión',
    btn_copy:'Copiar', btn_close:'Cerrar',
    progress:'Procesando...', success:'¡Listo!',
    err_file:'Por favor, sube un archivo primero.',
    err_size:'Archivo demasiado grande.', err_format:'Formato no soportado.',
    lang_select:'Seleccionar idioma',
  },
  de: {
    code:'de', name:'Deutsch', flag:'🇩🇪', dir:'ltr',
    nav_home:'Startseite', nav_file:'Datei-Tools', nav_geo:'Geospatiale Tools',
    nav_conv:'Konverter', nav_all:'Alle Tools', nav_blog:'Blog',
    nav_help:'Hilfe', nav_about:'Über uns', nav_contact:'Kontakt',
    hero_badge:'100% Kostenlos • Ohne Anmeldung • Ohne Limits',
    hero_title:'Alle Ihre Konvertierungen.\nEinfach. Schnell.',
    hero_free:'Kostenlos.',
    hero_desc:'ConverterHub bietet kostenlose Online-Tools für Datei-, Bild- und Koordinatenkonvertierungen.',
    hero_explore:'Tools erkunden', hero_how:'So funktioniert es',
    upload_title:'Datei hier ablegen', upload_or:'oder',
    upload_browse:'klicken zum Durchsuchen', upload_formats:'Unterstützt 200+ Formate',
    popular:'Beliebte Tools', view_all:'Alle Tools anzeigen →',
    browse_cat:'Tools nach Kategorie', how_works:'So funktioniert es',
    how_1_title:'Tool wählen', how_1_desc:'Wählen Sie das benötigte Tool.',
    how_2_title:'Hochladen oder eingeben', how_2_desc:'Laden Sie Ihre Datei hoch.',
    how_3_title:'Konvertieren', how_3_desc:'Wir verarbeiten Ihre Datei sofort.',
    how_4_title:'Ergebnis herunterladen', how_4_desc:'Laden Sie Ihre konvertierte Datei herunter.',
    trust_title:'Von Nutzern weltweit vertraut',
    trust_desc:'ConverterHub wird von Studenten und Fachleuten in 190+ Ländern genutzt.',
    footer_tagline:'Alle Ihre Konvertierungen. Einfach. Schnell. Kostenlos.',
    footer_tools:'Tools', footer_resources:'Ressourcen', footer_company:'Unternehmen',
    footer_legal:'Rechtliches', footer_languages:'Sprachen',
    footer_file:'Datei-Tools', footer_geo:'Geospatiale Tools',
    footer_image:'Bild-Tools', footer_conv:'Konverter', footer_all:'Alle Tools',
    footer_blog:'Blog', footer_help:'Hilfe', footer_how:'So funktioniert es',
    footer_faq:'FAQ', footer_suggest:'Tool vorschlagen',
    footer_about:'Über uns', footer_contact:'Kontakt',
    footer_privacy:'Datenschutz', footer_terms:'Nutzungsbedingungen',
    footer_cookie:'Cookie-Richtlinie', footer_copy:'© 2026 ConverterHub. Alle Rechte vorbehalten.',
    cookie_msg:'Wir verwenden Cookies und Google AdSense.',
    cookie_accept:'Alle akzeptieren', cookie_decline:'Ablehnen',
    btn_convert:'Konvertieren', btn_download:'Herunterladen', btn_reset:'Neue Konvertierung',
    btn_copy:'Kopieren', btn_close:'Schließen',
    progress:'Verarbeitung...', success:'Fertig!',
    err_file:'Bitte zuerst eine Datei hochladen.',
    err_size:'Datei zu groß.', err_format:'Format nicht unterstützt.',
    lang_select:'Sprache auswählen',
  },
  pt: {
    code:'pt', name:'Português', flag:'🇵🇹', dir:'ltr',
    nav_home:'Início', nav_file:'Ferramentas', nav_geo:'Ferramentas Geoespaciais',
    nav_conv:'Conversores', nav_all:'Todas as Ferramentas', nav_blog:'Blog',
    nav_help:'Ajuda', nav_about:'Sobre', nav_contact:'Contacto',
    hero_badge:'100% Grátis • Sem Registo • Sem Limites',
    hero_title:'Todas as suas Conversões.\nSimples. Rápidas.',
    hero_free:'Grátis.',
    hero_desc:'ConverterHub oferece ferramentas gratuitas para converter ficheiros, imagens e coordenadas.',
    hero_explore:'Explorar Ferramentas', hero_how:'Como Funciona',
    upload_title:'Arraste e largue o seu ficheiro aqui', upload_or:'ou',
    upload_browse:'clique para procurar', upload_formats:'Suporta 200+ formatos',
    popular:'Ferramentas Populares', view_all:'Ver todas →',
    browse_cat:'Navegar por Categoria', how_works:'Como Funciona',
    how_1_title:'Escolha uma ferramenta', how_1_desc:'Seleccione a ferramenta que precisa.',
    how_2_title:'Carregue ou introduza', how_2_desc:'Carregue o seu ficheiro.',
    how_3_title:'Converta', how_3_desc:'Processamos o seu ficheiro instantaneamente.',
    how_4_title:'Descarregue o resultado', how_4_desc:'Descarregue o seu ficheiro convertido.',
    trust_title:'Usado em todo o mundo',
    trust_desc:'ConverterHub é usado em 190+ países.',
    footer_tagline:'Todas as suas conversões. Simples. Rápidas. Grátis.',
    footer_tools:'Ferramentas', footer_resources:'Recursos', footer_company:'Empresa',
    footer_legal:'Legal', footer_languages:'Idiomas',
    footer_file:'Ferramentas Ficheiro', footer_geo:'Ferramentas Geoespaciais',
    footer_image:'Ferramentas Imagem', footer_conv:'Conversores', footer_all:'Todas',
    footer_blog:'Blog', footer_help:'Centro de Ajuda', footer_how:'Como Funciona',
    footer_faq:'FAQ', footer_suggest:'Sugerir Ferramenta',
    footer_about:'Sobre nós', footer_contact:'Contacto',
    footer_privacy:'Política de Privacidade', footer_terms:'Termos de Serviço',
    footer_cookie:'Política de Cookies', footer_copy:'© 2026 ConverterHub. Todos os direitos reservados.',
    cookie_msg:'Utilizamos cookies e Google AdSense para anúncios.',
    cookie_accept:'Aceitar tudo', cookie_decline:'Recusar',
    btn_convert:'Converter', btn_download:'Descarregar', btn_reset:'Nova conversão',
    btn_copy:'Copiar', btn_close:'Fechar',
    progress:'A processar...', success:'Concluído!',
    err_file:'Por favor, carregue primeiro um ficheiro.',
    err_size:'Ficheiro demasiado grande.', err_format:'Formato não suportado.',
    lang_select:'Seleccionar idioma',
  },
  ar: {
    code:'ar', name:'العربية', flag:'🇸🇦', dir:'rtl',
    nav_home:'الرئيسية', nav_file:'أدوات الملفات', nav_geo:'الأدوات الجغرافية',
    nav_conv:'المحولات', nav_all:'جميع الأدوات', nav_blog:'المدونة',
    nav_help:'المساعدة', nav_about:'حول', nav_contact:'اتصل بنا',
    hero_badge:'مجاني 100٪ • بدون تسجيل • بدون حدود',
    hero_title:'جميع تحويلاتك.\nبسيطة. سريعة.',
    hero_free:'مجانية.',
    hero_desc:'ConverterHub يوفر أدوات مجانية لتحويل الملفات والصور والإحداثيات.',
    hero_explore:'استكشاف الأدوات', hero_how:'كيف يعمل',
    upload_title:'اسحب وأفلت ملفك هنا', upload_or:'أو',
    upload_browse:'انقر للتصفح', upload_formats:'يدعم أكثر من 200 تنسيق',
    popular:'الأدوات الشائعة', view_all:'عرض جميع الأدوات →',
    browse_cat:'تصفح حسب الفئة', how_works:'كيف يعمل',
    how_1_title:'اختر أداة', how_1_desc:'حدد الأداة التي تحتاجها.',
    how_2_title:'تحميل أو إدخال', how_2_desc:'قم بتحميل ملفك أو إدخال البيانات.',
    how_3_title:'تحويل', how_3_desc:'نعالج ملفك على الفور.',
    how_4_title:'تحميل النتيجة', how_4_desc:'قم بتنزيل ملفك المحول.',
    trust_title:'موثوق به من مستخدمين حول العالم',
    trust_desc:'يستخدم ConverterHub في أكثر من 190 دولة.',
    footer_tagline:'جميع تحويلاتك. بسيطة. سريعة. مجانية.',
    footer_tools:'الأدوات', footer_resources:'الموارد', footer_company:'الشركة',
    footer_legal:'قانوني', footer_languages:'اللغات',
    footer_file:'أدوات الملفات', footer_geo:'الأدوات الجغرافية',
    footer_image:'أدوات الصور', footer_conv:'المحولات', footer_all:'جميع الأدوات',
    footer_blog:'المدونة', footer_help:'مركز المساعدة', footer_how:'كيف يعمل',
    footer_faq:'الأسئلة الشائعة', footer_suggest:'اقترح أداة',
    footer_about:'حول', footer_contact:'اتصل بنا',
    footer_privacy:'سياسة الخصوصية', footer_terms:'شروط الخدمة',
    footer_cookie:'سياسة ملفات تعريف الارتباط', footer_copy:'© 2026 ConverterHub. جميع الحقوق محفوظة.',
    cookie_msg:'نستخدم ملفات تعريف الارتباط وGoogle AdSense للإعلانات.',
    cookie_accept:'قبول الكل', cookie_decline:'رفض',
    btn_convert:'تحويل', btn_download:'تحميل', btn_reset:'تحويل جديد',
    btn_copy:'نسخ', btn_close:'إغلاق',
    progress:'جارٍ المعالجة...', success:'تم!',
    err_file:'يرجى تحميل ملف أولاً.',
    err_size:'الملف كبير جداً.', err_format:'تنسيق غير مدعوم.',
    lang_select:'اختر اللغة',
  },
  zh: {
    code:'zh', name:'中文 (简体)', flag:'🇨🇳', dir:'ltr',
    nav_home:'首页', nav_file:'文件工具', nav_geo:'地理空间工具',
    nav_conv:'转换器', nav_all:'所有工具', nav_blog:'博客',
    nav_help:'帮助', nav_about:'关于', nav_contact:'联系我们',
    hero_badge:'100% 免费 • 无需注册 • 无限制',
    hero_title:'您的所有转换。\n简单。快速。',
    hero_free:'免费。',
    hero_desc:'ConverterHub 提供免费在线工具，用于文件、图像和坐标转换。',
    hero_explore:'探索工具', hero_how:'工作原理',
    upload_title:'将文件拖放到此处', upload_or:'或',
    upload_browse:'点击浏览', upload_formats:'支持200+文件格式',
    popular:'热门工具', view_all:'查看所有工具 →',
    browse_cat:'按类别浏览工具', how_works:'工作原理',
    how_1_title:'选择工具', how_1_desc:'从我们的工具库中选择所需工具。',
    how_2_title:'上传或输入', how_2_desc:'上传文件或输入所需数据。',
    how_3_title:'转换', how_3_desc:'我们即时安全地处理您的文件。',
    how_4_title:'下载结果', how_4_desc:'下载您转换后的文件。',
    trust_title:'受全球用户信赖',
    trust_desc:'ConverterHub被190多个国家的学生和专业人士使用。',
    footer_tagline:'您的所有转换。简单。快速。免费。',
    footer_tools:'工具', footer_resources:'资源', footer_company:'公司',
    footer_legal:'法律', footer_languages:'语言',
    footer_file:'文件工具', footer_geo:'地理空间工具',
    footer_image:'图像工具', footer_conv:'转换器', footer_all:'所有工具',
    footer_blog:'博客', footer_help:'帮助中心', footer_how:'工作原理',
    footer_faq:'常见问题', footer_suggest:'建议工具',
    footer_about:'关于我们', footer_contact:'联系我们',
    footer_privacy:'隐私政策', footer_terms:'服务条款',
    footer_cookie:'Cookie政策', footer_copy:'© 2026 ConverterHub. 保留所有权利。',
    cookie_msg:'我们使用Cookie和Google AdSense投放广告。',
    cookie_accept:'全部接受', cookie_decline:'拒绝',
    btn_convert:'转换', btn_download:'下载', btn_reset:'新的转换',
    btn_copy:'复制', btn_close:'关闭',
    progress:'处理中...', success:'完成！',
    err_file:'请先上传文件。', err_size:'文件太大。', err_format:'不支持的格式。',
    lang_select:'选择语言',
  },
  hi: {
    code:'hi', name:'हिन्दी', flag:'🇮🇳', dir:'ltr',
    nav_home:'होम', nav_file:'फ़ाइल टूल्स', nav_geo:'भू-स्थानिक टूल्स',
    nav_conv:'कन्वर्टर्स', nav_all:'सभी टूल्स', nav_blog:'ब्लॉग',
    nav_help:'सहायता', nav_about:'हमारे बारे में', nav_contact:'संपर्क',
    hero_badge:'100% मुफ़्त • बिना साइनअप • बिना सीमा',
    hero_title:'आपके सभी रूपांतरण।\nसरल। तेज़।',
    hero_free:'मुफ़्त।',
    hero_desc:'ConverterHub फ़ाइल, चित्र और निर्देशांक रूपांतरण के लिए मुफ़्त ऑनलाइन टूल प्रदान करता है।',
    hero_explore:'टूल्स देखें', hero_how:'यह कैसे काम करता है',
    upload_title:'यहाँ अपनी फ़ाइल खींचें और छोड़ें', upload_or:'या',
    upload_browse:'ब्राउज़ करने के लिए क्लिक करें', upload_formats:'200+ फ़ॉर्मेट समर्थित',
    popular:'लोकप्रिय टूल्स', view_all:'सभी टूल्स देखें →',
    browse_cat:'श्रेणी के अनुसार टूल्स', how_works:'यह कैसे काम करता है',
    how_1_title:'टूल चुनें', how_1_desc:'अपनी ज़रूरत का टूल चुनें।',
    how_2_title:'अपलोड करें या दर्ज करें', how_2_desc:'अपनी फ़ाइल अपलोड करें।',
    how_3_title:'कनवर्ट करें', how_3_desc:'हम आपकी फ़ाइल तुरंत प्रोसेस करते हैं।',
    how_4_title:'परिणाम डाउनलोड करें', how_4_desc:'कनवर्ट की गई फ़ाइल डाउनलोड करें।',
    trust_title:'दुनिया भर के उपयोगकर्ताओं द्वारा भरोसेमंद',
    trust_desc:'ConverterHub 190+ देशों में उपयोग किया जाता है।',
    footer_tagline:'आपके सभी रूपांतरण। सरल। तेज़। मुफ़्त।',
    footer_tools:'टूल्स', footer_resources:'संसाधन', footer_company:'कंपनी',
    footer_legal:'कानूनी', footer_languages:'भाषाएँ',
    footer_file:'फ़ाइल टूल्स', footer_geo:'भू-स्थानिक टूल्स',
    footer_image:'चित्र टूल्स', footer_conv:'कन्वर्टर्स', footer_all:'सभी टूल्स',
    footer_blog:'ब्लॉग', footer_help:'सहायता केंद्र', footer_how:'यह कैसे काम करता है',
    footer_faq:'अक्सर पूछे जाने वाले प्रश्न', footer_suggest:'टूल सुझाएँ',
    footer_about:'हमारे बारे में', footer_contact:'संपर्क करें',
    footer_privacy:'गोपनीयता नीति', footer_terms:'सेवा की शर्तें',
    footer_cookie:'कुकी नीति', footer_copy:'© 2026 ConverterHub. सभी अधिकार सुरक्षित।',
    cookie_msg:'हम विज्ञापनों के लिए कुकीज़ और Google AdSense का उपयोग करते हैं।',
    cookie_accept:'सभी स्वीकार करें', cookie_decline:'अस्वीकार करें',
    btn_convert:'कनवर्ट करें', btn_download:'डाउनलोड करें', btn_reset:'नया रूपांतरण',
    btn_copy:'कॉपी करें', btn_close:'बंद करें',
    progress:'प्रोसेस हो रहा है...', success:'हो गया!',
    err_file:'कृपया पहले एक फ़ाइल अपलोड करें।',
    err_size:'फ़ाइल बहुत बड़ी है।', err_format:'असमर्थित फ़ॉर्मेट।',
    lang_select:'भाषा चुनें',
  },
};

// ── LANGUAGE STATE ───────────────────────────────────────────
let currentLang = localStorage.getItem('ch_lang') || 'en';
if (!LANGS[currentLang]) currentLang = 'en';

function t(key) {
  return (LANGS[currentLang] && LANGS[currentLang][key]) || LANGS['en'][key] || key;
}

function setLang(code) {
  if (!LANGS[code]) return;
  currentLang = code;
  localStorage.setItem('ch_lang', code);
  document.documentElement.lang = code;
  document.documentElement.dir = LANGS[code].dir || 'ltr';
  applyLangToPage();
  closeLangModal();
}

function applyLangToPage() {
  // Apply data-i18n attributes
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (el.placeholder !== undefined) el.placeholder = t(key);
    else el.textContent = t(key);
  });
  // Update lang modal active state
  document.querySelectorAll('.ch-lang-option').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === currentLang);
  });
  // Update header lang button
  const langBtn = document.getElementById('chLangBtn');
  if (langBtn) {
    langBtn.innerHTML = LANGS[currentLang].flag + ' ' + currentLang.toUpperCase() +
      ' <svg width="10" height="10" viewBox="0 0 10 10"><path fill="currentColor" d="M5 7L1 3h8z"/></svg>';
  }
}

// ── HEADER BUILDER ───────────────────────────────────────────
function buildHeader(activePage) {
  const categories = [
    {
      label: '<span data-i18n="nav_file">File Tools</span>',
      items: [
        {icon:'📄', href:'pdf-to-word.html',    name:'PDF to Word'},
        {icon:'📝', href:'word-to-pdf.html',     name:'Word to PDF'},
        {icon:'📃', href:'pdf-merge-split.html', name:'PDF Merge & Split'},
        {icon:'🖼', href:'image-to-pdf.html',    name:'Image to PDF'},
        {icon:'📊', href:'excel-to-pdf.html',    name:'Excel to PDF'},
        {icon:'🔎', href:'ocr-image-to-text.html',name:'OCR Image to Text'},
        {icon:'📦', href:'file-compressor.html', name:'File Compressor'},
      ]
    },
    {
      label: '<span data-i18n="nav_geo">Geospatial Tools</span>',
      items: [
        {icon:'🧭', href:'coordinate-converter.html', name:'Coordinate Converter'},
        {icon:'🗺', href:'dwg-to-kmz.html',           name:'UTM to KMZ'},
        {icon:'🏞', href:'land-calculator.html',       name:'Land Calculator'},
      ]
    },
    {
      label: '<span data-i18n="nav_conv">Converters</span>',
      items: [
        {icon:'💱', href:'currency-converter.html',    name:'Currency Converter'},
        {icon:'📐', href:'unit-converter.html',        name:'Unit Converter'},
        {icon:'🌐', href:'language-translator.html',   name:'Language Translator'},
        {icon:'🔊', href:'text-to-speech.html',        name:'Text to Speech'},
        {icon:'📊', href:'csv-to-excel.html',          name:'CSV to Excel'},
      ]
    },
  ];

  const imageTools = [
    {icon:'✂️', href:'background-remover.html',       name:'Background Remover'},
    {icon:'🎨', href:'image-editor.html',             name:'Image Editor'},
    {icon:'🗃', href:'image-compressor.html',         name:'Image Compressor'},
    {icon:'📷', href:'youtube-thumbnail-downloader.html', name:'YouTube Thumbnail'},
  ];

  const allToolsItems = [
    {icon:'📝', href:'resume-builder.html',    name:'Resume Builder'},
    {icon:'🔐', href:'password-generator.html', name:'Password Generator'},
    {icon:'📱', href:'qr-code-generator.html',  name:'QR Code Generator'},
    {icon:'💰', href:'loan-calculator.html',    name:'Loan Calculator'},
    ...imageTools,
  ];

  const ddColors = {
    'pdf-to-word.html':'#fee2e2', 'word-to-pdf.html':'#fee2e2',
    'pdf-merge-split.html':'#fee2e2', 'image-to-pdf.html':'#fee2e2',
    'excel-to-pdf.html':'#fee2e2', 'ocr-image-to-text.html':'#ede9fe',
    'file-compressor.html':'#fef3c7',
    'coordinate-converter.html':'#ccfbf1', 'dwg-to-kmz.html':'#ccfbf1', 'land-calculator.html':'#ccfbf1',
    'currency-converter.html':'#d1fae5', 'unit-converter.html':'#d1fae5',
    'language-translator.html':'#dbeafe', 'text-to-speech.html':'#dbeafe', 'csv-to-excel.html':'#dbeafe',
    'background-remover.html':'#ede9fe', 'image-editor.html':'#ede9fe',
    'image-compressor.html':'#ede9fe', 'youtube-thumbnail-downloader.html':'#ede9fe',
    'resume-builder.html':'#dbeafe', 'password-generator.html':'#dbeafe',
    'qr-code-generator.html':'#dbeafe', 'loan-calculator.html':'#d1fae5',
  };

  function ddItem(item) {
    const bg = ddColors[item.href] || '#f1f5f9';
    return `<a href="${item.href}" class="ch-dropdown-link${activePage === item.href ? ' active' : ''}">
      <span class="dd-icon" style="background:${bg};">${item.icon}</span>
      ${item.name}
    </a>`;
  }

  const catNavItems = categories.map(cat => `
    <div class="ch-nav-item">
      <button class="ch-nav-link">${cat.label} <svg viewBox="0 0 12 12"><path fill="currentColor" d="M6 8L1 3h10z"/></svg></button>
      <div class="ch-dropdown">${cat.items.map(ddItem).join('')}</div>
    </div>
  `).join('');

  const imageDD = `<div class="ch-nav-item">
    <button class="ch-nav-link">🎨 Image Tools <svg viewBox="0 0 12 12"><path fill="currentColor" d="M6 8L1 3h10z"/></svg></button>
    <div class="ch-dropdown">${imageTools.map(ddItem).join('')}</div>
  </div>`;

  const allDD = `<div class="ch-nav-item">
    <button class="ch-nav-link" data-i18n="nav_all">All Tools <svg viewBox="0 0 12 12"><path fill="currentColor" d="M6 8L1 3h10z"/></svg></button>
    <div class="ch-dropdown">${allToolsItems.map(ddItem).join('')}</div>
  </div>`;

  const headerHTML = `
  <header class="ch-header" role="banner">
    <div class="ch-container">
      <div class="ch-header-inner">
        <!-- Logo -->
        <a href="index.html" class="ch-logo" aria-label="ConverterHub home">
          <div class="ch-logo-icon">
            <svg width="20" height="20" viewBox="0 0 48 48" fill="none">
              <rect width="48" height="48" rx="10" fill="white" fill-opacity=".15"/>
              <path d="M15 18h18v3H15v-3zm0 6h12v3H15v-3zm0 6h18v3H15v-3z" fill="white"/>
              <path d="M30 12l6 6-6 6" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="ch-logo-text">
            <span class="ch-logo-name">ConverterHub</span>
            <span class="ch-logo-tagline">All Your Conversions. Simple. Fast. Free.</span>
          </div>
        </a>

        <!-- Desktop Nav -->
        <nav class="ch-nav" role="navigation" aria-label="Main navigation">
          <a href="index.html" class="ch-nav-link${activePage === 'index.html' ? ' active' : ''}" data-i18n="nav_home">Home</a>
          ${catNavItems}
          ${imageDD}
          ${allDD}
          <a href="https://tivorahub.blogspot.com" class="ch-nav-link${activePage === 'guides.html' ? ' active' : ''}" data-i18n="nav_blog">Blog</a>
          <a href="contact.html" class="ch-nav-link${activePage === 'contact.html' ? ' active' : ''}" data-i18n="nav_help">Help</a>
        </nav>

        <!-- Controls -->
        <div class="ch-header-controls">
          <button class="ch-lang-btn" id="chLangBtn" aria-label="Select language">
            🇬🇧 EN <svg width="10" height="10" viewBox="0 0 10 10"><path fill="currentColor" d="M5 7L1 3h8z"/></svg>
          </button>
          <button class="ch-theme-btn" id="chThemeBtn" aria-label="Toggle dark mode">🌙</button>
          <button class="ch-menu-btn" id="chMenuBtn" aria-label="Open menu" aria-expanded="false">☰</button>
        </div>
      </div>
    </div>
  </header>

  <!-- Mobile nav -->
  <nav class="ch-mobile-nav" id="chMobileNav" role="navigation" aria-label="Mobile navigation">
    <div class="ch-mobile-section">
      <div class="ch-mobile-section-title" data-i18n="nav_home">Main</div>
      <a href="index.html" class="ch-mobile-link${activePage === 'index.html' ? ' active' : ''}"><span class="ml-icon">🏠</span> <span data-i18n="nav_home">Home</span></a>
      <a href="https://tivorahub.blogspot.com" class="ch-mobile-link${activePage === 'guides.html' ? ' active' : ''}"><span class="ml-icon">📘</span> Guides</a>
      <a href="about.html" class="ch-mobile-link${activePage === 'about.html' ? ' active' : ''}"><span class="ml-icon">ℹ️</span> <span data-i18n="nav_about">About</span></a>
      <a href="contact.html" class="ch-mobile-link${activePage === 'contact.html' ? ' active' : ''}"><span class="ml-icon">✉️</span> <span data-i18n="nav_contact">Contact</span></a>
    </div>
    <div class="ch-mobile-section">
      <div class="ch-mobile-section-title" data-i18n="nav_file">File Tools</div>
      <a href="pdf-to-word.html" class="ch-mobile-link${activePage === 'pdf-to-word.html' ? ' active' : ''}"><span class="ml-icon">📄</span> PDF to Word</a>
      <a href="word-to-pdf.html" class="ch-mobile-link${activePage === 'word-to-pdf.html' ? ' active' : ''}"><span class="ml-icon">📝</span> Word to PDF</a>
      <a href="pdf-merge-split.html" class="ch-mobile-link${activePage === 'pdf-merge-split.html' ? ' active' : ''}"><span class="ml-icon">📃</span> PDF Merge & Split</a>
      <a href="image-to-pdf.html" class="ch-mobile-link${activePage === 'image-to-pdf.html' ? ' active' : ''}"><span class="ml-icon">🖼</span> Image to PDF</a>
      <a href="ocr-image-to-text.html" class="ch-mobile-link${activePage === 'ocr-image-to-text.html' ? ' active' : ''}"><span class="ml-icon">🔎</span> OCR Image to Text</a>
      <a href="file-compressor.html" class="ch-mobile-link${activePage === 'file-compressor.html' ? ' active' : ''}"><span class="ml-icon">📦</span> File Compressor</a>
    </div>
    <div class="ch-mobile-section">
      <div class="ch-mobile-section-title" data-i18n="nav_geo">Geospatial Tools</div>
      <a href="coordinate-converter.html" class="ch-mobile-link${activePage === 'coordinate-converter.html' ? ' active' : ''}"><span class="ml-icon">🧭</span> Coordinate Converter</a>
      <a href="dwg-to-kmz.html" class="ch-mobile-link${activePage === 'dwg-to-kmz.html' ? ' active' : ''}"><span class="ml-icon">🗺</span> UTM to KMZ</a>
      <a href="land-calculator.html" class="ch-mobile-link${activePage === 'land-calculator.html' ? ' active' : ''}"><span class="ml-icon">🏞</span> Land Calculator</a>
    </div>
    <div class="ch-mobile-section">
      <div class="ch-mobile-section-title">Image Tools</div>
      <a href="background-remover.html" class="ch-mobile-link${activePage === 'background-remover.html' ? ' active' : ''}"><span class="ml-icon">✂️</span> Background Remover</a>
      <a href="image-editor.html" class="ch-mobile-link${activePage === 'image-editor.html' ? ' active' : ''}"><span class="ml-icon">🎨</span> Image Editor</a>
      <a href="image-compressor.html" class="ch-mobile-link${activePage === 'image-compressor.html' ? ' active' : ''}"><span class="ml-icon">🗃</span> Image Compressor</a>
    </div>
    <div class="ch-mobile-section">
      <div class="ch-mobile-section-title" data-i18n="nav_conv">Converters & More</div>
      <a href="currency-converter.html" class="ch-mobile-link${activePage === 'currency-converter.html' ? ' active' : ''}"><span class="ml-icon">💱</span> Currency</a>
      <a href="unit-converter.html" class="ch-mobile-link${activePage === 'unit-converter.html' ? ' active' : ''}"><span class="ml-icon">📐</span> Units</a>
      <a href="loan-calculator.html" class="ch-mobile-link${activePage === 'loan-calculator.html' ? ' active' : ''}"><span class="ml-icon">💰</span> Loan Calculator</a>
      <a href="resume-builder.html" class="ch-mobile-link${activePage === 'resume-builder.html' ? ' active' : ''}"><span class="ml-icon">📝</span> Resume Builder</a>
      <a href="qr-code-generator.html" class="ch-mobile-link${activePage === 'qr-code-generator.html' ? ' active' : ''}"><span class="ml-icon">📱</span> QR Code</a>
      <a href="language-translator.html" class="ch-mobile-link${activePage === 'language-translator.html' ? ' active' : ''}"><span class="ml-icon">🌐</span> Translator</a>
    </div>
    <div style="padding:16px 8px;border-top:1px solid var(--border);display:flex;gap:10px;align-items:center;">
      <button onclick="openLangModal()" class="ch-lang-btn" style="flex:1;">🌍 <span data-i18n="lang_select">Select Language</span></button>
      <a href="https://flutterwave.com/donate/ffvpblnvhvvz" target="_blank" class="donate-button">❤️ Donate</a>
    </div>
  </nav>

  <!-- Language Modal -->
  <div class="ch-lang-modal" id="chLangModal" role="dialog" aria-modal="true" aria-label="Language selection">
    <div class="ch-lang-panel">
      <h3>🌍 <span data-i18n="lang_select">Select Language</span></h3>
      <div class="ch-lang-grid">
        ${Object.values(LANGS).map(l => `
          <button class="ch-lang-option${currentLang === l.code ? ' active' : ''}" data-lang="${l.code}" onclick="setLang('${l.code}')">
            <span class="ch-lang-flag">${l.flag}</span> ${l.name}
          </button>
        `).join('')}
      </div>
      <div style="margin-top:16px;text-align:right;">
        <button class="ch-btn ch-btn-secondary ch-btn-sm" onclick="closeLangModal()">✕ Close</button>
      </div>
    </div>
  </div>
  `;

  // Insert header at top of body
  const existing = document.getElementById('chHeader');
  if (existing) existing.remove();
  const wrap = document.createElement('div');
  wrap.id = 'chHeader';
  wrap.innerHTML = headerHTML;
  document.body.insertBefore(wrap, document.body.firstChild);

  // Wire theme button
  const themeBtn = document.getElementById('chThemeBtn');
  if (themeBtn) {
    const isDark = document.body.classList.contains('dark');
    themeBtn.textContent = isDark ? '☀️' : '🌙';
    themeBtn.addEventListener('click', toggleTheme);
  }

  // Wire menu button
  const menuBtn = document.getElementById('chMenuBtn');
  const mobileNav = document.getElementById('chMobileNav');
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open);
      menuBtn.textContent = open ? '✕' : '☰';
    });
  }

  // Wire lang button
  document.getElementById('chLangBtn').addEventListener('click', openLangModal);
  document.getElementById('chLangModal').addEventListener('click', function(e) {
    if (e.target === this) closeLangModal();
  });

  applyLangToPage();
}

// ── FOOTER BUILDER ───────────────────────────────────────────
function buildFooter() {
  const footerHTML = `
  <footer class="ch-footer" role="contentinfo">
    <div class="ch-container">
      <div class="ch-footer-main">
        <!-- Brand -->
        <div class="ch-footer-brand">
          <a href="index.html" class="ch-footer-logo">
            <div class="ch-footer-logo-icon">
              <svg width="16" height="16" viewBox="0 0 48 48" fill="none">
                <path d="M15 18h18v3H15v-3zm0 6h12v3H15v-3zm0 6h18v3H15v-3z" fill="white"/>
              </svg>
            </div>
            <span class="ch-footer-logo-name">ConverterHub</span>
          </a>
          <p class="ch-footer-tagline" data-i18n="footer_tagline">All your conversions. Simple. Fast. Free. Powerful online tools for everyday needs.</p>
          <div class="ch-footer-social">
            <a href="#" class="ch-social-btn" aria-label="Facebook">f</a>
            <a href="#" class="ch-social-btn" aria-label="Twitter">𝕏</a>
            <a href="#" class="ch-social-btn" aria-label="LinkedIn">in</a>
          </div>
        </div>

        <!-- Tools -->
        <div class="ch-footer-col">
          <h4 data-i18n="footer_tools">Tools</h4>
          <ul class="ch-footer-links">
            <li><a href="pdf-to-word.html">PDF to Word</a></li>
            <li><a href="coordinate-converter.html" data-i18n="nav_geo">Geospatial Tools</a></li>
            <li><a href="background-remover.html">Background Remover</a></li>
            <li><a href="loan-calculator.html">Loan Calculator</a></li>
            <li><a href="resume-builder.html">Resume Builder</a></li>
            <li><a href="ocr-image-to-text.html">OCR Image to Text</a></li>
          </ul>
        </div>

        <!-- Resources -->
        <div class="ch-footer-col">
          <h4 data-i18n="footer_resources">Resources</h4>
          <ul class="ch-footer-links">
            <li><a href="https://tivorahub.blogspot.com" data-i18n="footer_blog">Blog</a></li>
            <li><a href="contact.html" data-i18n="footer_help">Help Center</a></li>
            <li><a href="https://tivorahub.blogspot.com" data-i18n="footer_how">How It Works</a></li>
            <li><a href="contact.html" data-i18n="footer_suggest">Suggest a Tool</a></li>
          </ul>
        </div>

        <!-- Company -->
        <div class="ch-footer-col">
          <h4 data-i18n="footer_company">Company</h4>
          <ul class="ch-footer-links">
            <li><a href="about.html" data-i18n="footer_about">About Us</a></li>
            <li><a href="contact.html" data-i18n="footer_contact">Contact Us</a></li>
            <li><a href="https://flutterwave.com/donate/ffvpblnvhvvz" target="_blank">Donate</a></li>
          </ul>
        </div>

        <!-- Legal + Languages -->
        <div class="ch-footer-col">
          <h4 data-i18n="footer_legal">Legal</h4>
          <ul class="ch-footer-links" style="margin-bottom:16px;">
            <li><a href="privacy-policy.html" data-i18n="footer_privacy">Privacy Policy</a></li>
            <li><a href="privacy-policy.html" data-i18n="footer_terms">Terms of Service</a></li>
            <li><a href="privacy-policy.html" data-i18n="footer_cookie">Cookie Policy</a></li>
          </ul>
          <h4 data-i18n="footer_languages">Languages</h4>
          <div class="ch-footer-langs">
            ${Object.values(LANGS).map(l =>
              `<button class="ch-footer-lang-btn" onclick="setLang('${l.code}')">${l.flag} ${l.name.split(' ')[0]}</button>`
            ).join('')}
          </div>
        </div>
      </div>

      <!-- AdSense note -->
      <div class="ch-adsense-note">
        <span>Clean, non-intrusive ads help us keep ConverterHub free for everyone.</span>
        <img src="https://www.gstatic.com/images/branding/product/1x/adsense_48dp.png" height="20" alt="Google AdSense" style="opacity:.6;">
      </div>

      <!-- Bottom bar -->
      <div class="ch-footer-bottom">
        <span class="ch-footer-copy" data-i18n="footer_copy">© 2026 ConverterHub. All rights reserved.</span>
        <div class="ch-footer-bottom-links">
          
          <a href="contact.html" data-i18n="footer_contact">Contact</a>
        </div>
      </div>
    </div>
  </footer>

  <!-- Cookie Banner -->
  <div class="ch-cookie" id="chCookie" role="region" aria-label="Cookie consent">
    <div class="ch-cookie-inner">
      <p class="ch-cookie-text">
        🍪 <span data-i18n="cookie_msg">We use cookies and Google AdSense to serve ads and analyse traffic.</span>
        <a href="privacy-policy.html"> Privacy Policy</a>
      </p>
      <div class="ch-cookie-btns">
        <button class="ch-btn ch-btn-primary ch-btn-sm" id="chCookieAccept" data-i18n="cookie_accept">Accept All</button>
        <button class="ch-btn ch-btn-secondary ch-btn-sm" id="chCookieDecline" data-i18n="cookie_decline">Decline</button>
      </div>
    </div>
  </div>
  `;

  const wrap = document.createElement('div');
  wrap.id = 'chFooter';
  wrap.innerHTML = footerHTML;
  document.body.appendChild(wrap);

  // Cookie logic
  const cookie = document.getElementById('chCookie');
  if (!localStorage.getItem('ch_cookie')) cookie.classList.add('show');
  document.getElementById('chCookieAccept').addEventListener('click', () => {
    localStorage.setItem('ch_cookie', 'accepted');
    cookie.classList.remove('show');
  });
  document.getElementById('chCookieDecline').addEventListener('click', () => {
    localStorage.setItem('ch_cookie', 'declined');
    cookie.classList.remove('show');
  });
}

// ── THEME ────────────────────────────────────────────────────
function toggleTheme() {
  const isDark = document.body.classList.toggle('dark');
  document.documentElement.classList.toggle('dark', isDark);
  localStorage.setItem('ch_theme', isDark ? 'dark' : 'light');
  const btn = document.getElementById('chThemeBtn');
  if (btn) btn.textContent = isDark ? '☀️' : '🌙';
}

// ── LANG MODAL ───────────────────────────────────────────────
function openLangModal()  { document.getElementById('chLangModal').classList.add('open'); }
function closeLangModal() { document.getElementById('chLangModal').classList.remove('open'); }

// ── INIT ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function() {
  // Apply dark mode class to body (already applied to html above)
  const theme = localStorage.getItem('ch_theme');
  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.body.classList.add('dark');
  }

  // Detect current page
  const page = window.location.pathname.split('/').pop() || 'index.html';

  buildHeader(page);
  buildFooter();
  applyLangToPage();

  // FAQ accordion (generic — works on any page)
  document.querySelectorAll('.ch-faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.ch-faq-item');
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.ch-faq-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  // Generic copy buttons
  document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', () => {
      navigator.clipboard.writeText(btn.dataset.copy).then(() => {
        const orig = btn.textContent;
        btn.textContent = '✓';
        setTimeout(() => btn.textContent = orig, 1200);
      });
    });
  });
});

// ── EXPOSE GLOBALS ───────────────────────────────────────────
window.CHt          = t;
window.CHsetLang    = setLang;
window.CHLangs      = LANGS;
window.openLangModal  = openLangModal;
window.closeLangModal = closeLangModal;
