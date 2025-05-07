/**
 * Cloudflare Worker导航应用 - 主页
 * 功能：展示导航链接
 */

// HTML模板 - 导航页面
const NAV_HTML = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Skk-Panel</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary-color: #4361ee;
      --primary-hover: #3a56d4;
      --primary-light: #eef2ff;
      --secondary-color: #f72585;
      --secondary-hover: #e5177a;
      --secondary-light: #ffeef8;
      --success-color: #10b981;
      --warning-color: #f59e0b;
      --danger-color: #ef4444;
      --text-color: #1e293b;
      --text-light: #64748b;
      --text-lighter: #94a3b8;
      --border-color: #e2e8f0;
      --bg-color: #f8fafc;
      --card-bg: #ffffff;
      --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.05);
      --shadow-md: 0 5px 15px rgba(0, 0, 0, 0.07);
      --shadow-lg: 0 10px 25px rgba(0, 0, 0, 0.1);
      --shadow-hover: 0 10px 20px rgba(67, 97, 238, 0.15);
      --radius-sm: 8px;
      --radius-md: 12px;
      --radius-lg: 20px;
      --radius-full: 9999px;
      --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      --header-height: 70px;
      --toast-success: #10b981;
      --toast-danger: #ef4444;
      --toast-warning: #f59e0b;
      --toast-info: #3b82f6;
    }
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      line-height: 1.6;
      color: var(--text-color);
      background-color: var(--bg-color);
      padding: 0;
      min-height: 100vh;
    }
    
    .container {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 20px;
    }
    
    .main-header {
      height: var(--header-height);
      background-color: var(--card-bg);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
      position: sticky;
      top: 0;
      z-index: 100;
    }
    
    .header-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;
    }
    
    .logo {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .logo h1 {
      margin: 0;
      color: var(--text-color);
      font-size: 1.5rem;
      font-weight: 700;
      background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .logo-icon {
      font-size: 1.8rem;
      color: var(--primary-color);
    }
    
    .admin-link {
      background-color: var(--primary-color);
      color: white;
      text-decoration: none;
      padding: 10px 18px;
      border-radius: var(--radius-full);
      font-size: 15px;
      font-weight: 600;
      transition: var(--transition);
      display: inline-flex;
      align-items: center;
      gap: 8px;
      box-shadow: var(--shadow-sm);
    }
    
    .admin-link:hover {
      background-color: var(--primary-hover);
      transform: translateY(-2px);
      box-shadow: var(--shadow-hover);
    }
    
    .main-content {
      padding: 40px 0;
    }
    
    .content-header {
      margin-bottom: 30px;
    }
    
    .search-box {
      margin-bottom: 25px;
      position: relative;
    }
    
    .search-box input {
      width: 100%;
      padding: 14px 20px 14px 50px;
      border: 2px solid var(--border-color);
      border-radius: var(--radius-full);
      font-size: 16px;
      font-family: inherit;
      transition: var(--transition);
      box-shadow: var(--shadow-sm);
      color: var(--text-color);
    }
    
    .search-box input:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 4px rgba(67, 97, 238, 0.15);
    }
    
    .search-box i {
      position: absolute;
      left: 20px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-lighter);
      transition: var(--transition);
      font-size: 18px;
    }
    
    .search-box input:focus + i {
      color: var(--primary-color);
    }
    
    .category-filter {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 30px;
    }
    
    .category-btn {
      background-color: var(--card-bg);
      border: 2px solid var(--border-color);
      border-radius: var(--radius-full);
      padding: 8px 18px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: var(--transition);
      color: var(--text-light);
      font-family: inherit;
    }
    
    .category-btn:hover {
      border-color: var(--primary-color);
      color: var(--primary-color);
      background-color: var(--primary-light);
      transform: translateY(-2px);
    }
    
    .category-btn.active {
      background-color: var(--primary-color);
      color: white;
      border-color: var(--primary-color);
    }
    
    /* 公告轮播样式 */
    .announcement-carousel {
      margin-bottom: 30px;
    }
    
    .announcement-container {
      background-color: var(--card-bg);
      border-radius: var(--radius-md);
      padding: 15px 20px;
      box-shadow: var(--shadow-sm);
      border: 1px solid var(--border-color);
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      overflow: hidden;
    }
    
    .announcement-content {
      flex-grow: 1;
      padding: 0 15px;
      font-weight: 500;
      color: var(--text-color);
      display: flex;
      align-items: center;
      overflow: hidden;
    }
    
    .announcement-content i {
      color: var(--primary-color);
      margin-right: 12px;
      font-size: 1.2em;
    }
    
    .announcement-controls {
      display: flex;
      gap: 8px;
    }
    
    .announcement-btn {
      background-color: var(--primary-light);
      color: var(--primary-color);
      border: none;
      border-radius: var(--radius-full);
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: var(--transition);
    }
    
    .announcement-btn:hover {
      background-color: var(--primary-color);
      color: white;
      transform: translateY(-2px);
    }
    
    .announcement-item {
      display: none;
      animation: fadeIn 0.5s ease-out;
      cursor: pointer;
      width: 100%;
      overflow: hidden;
    }
    
    .announcement-item.active {
      display: flex;
      align-items: center;
    }
    
    .announcement-text {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      flex: 1;
    }
    
    .nav-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 25px;
    }
    
    .nav-item {
      background-color: var(--card-bg);
      border-radius: var(--radius-md);
      transition: var(--transition);
      border: 1px solid var(--border-color);
      box-shadow: var(--shadow-sm);
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    
    .nav-item::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
      opacity: 0;
      transition: var(--transition);
      z-index: 1;
    }
    
    .nav-item:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-hover);
      border-color: rgba(67, 97, 238, 0.2);
    }
    
    .nav-item:hover::before {
      opacity: 1;
    }
    
    .card-link {
      text-decoration: none;
      color: var(--text-color);
      display: flex;
      flex-direction: column;
      padding: 25px;
      flex-grow: 1;
      position: relative;
      z-index: 0;
    }
    
    .nav-item-title {
      font-weight: 700;
      font-size: 1.2em;
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 12px;
      transition: var(--transition);
      color: var(--text-color);
    }
    
    .nav-item:hover .nav-item-title {
      color: var(--primary-color);
    }
    
    .nav-item-title i {
      color: var(--primary-color);
      font-size: 0.9em;
    }
    
    .card-link p {
      color: var(--text-light);
      font-size: 0.95em;
      margin: 5px 0;
      line-height: 1.5;
      flex-grow: 1;
    }
    
    .nav-item-footer {
      margin-top: 15px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.85em;
      color: var(--text-lighter);
    }
    
    .nav-item-category {
      background-color: var(--primary-light);
      color: var(--primary-color);
      padding: 4px 10px;
      border-radius: var(--radius-full);
      font-weight: 600;
      font-size: 0.75em;
      margin-top: 10px;
      align-self: flex-start;
    }
    
    .alert {
      padding: 20px;
      border-radius: var(--radius-md);
      margin-bottom: 30px;
      text-align: center;
      grid-column: 1/-1;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      box-shadow: var(--shadow-sm);
      animation: fadeIn 0.5s ease-out;
    }
    
    .alert-info {
      background-color: var(--primary-light);
      color: var(--primary-color);
      border: 1px solid rgba(67, 97, 238, 0.2);
    }
    
    /* 悬浮窗提醒样式 */
    .toast {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
      min-width: 300px;
      padding: 15px 20px;
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-lg);
      color: white;
      transform: translateX(120%);
      transition: transform 0.3s ease-out;
      opacity: 0.95;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      font-weight: 600;
      animation: slideInRight 0.3s forwards;
    }
    
    .toast-success {
      background-color: var(--toast-success);
    }
    
    .toast-danger {
      background-color: var(--toast-danger);
    }
    
    .toast-warning {
      background-color: var(--toast-warning);
    }
    
    .toast-info {
      background-color: var(--toast-info);
    }
    
    .toast-content {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    .toast-content i {
      font-size: 1.2em;
    }
    
    @keyframes slideInRight {
      from { transform: translateX(120%); }
      to { transform: translateX(0); }
    }
    
    .footer {
      margin-top: 60px;
      text-align: center;
      color: var(--text-lighter);
      font-size: 0.9em;
      padding: 30px 0;
      border-top: 1px solid var(--border-color);
      position: relative;
    }
    
    /* 确保页脚在数据少时不会出现在屏幕中央 */
    @media (min-height: 800px) {
      .main-content {
        min-height: calc(100vh - 250px);
      }
    }
    
    .footer a {
      color: var(--primary-color);
      text-decoration: none;
      font-weight: 600;
    }
    
    .footer a:hover {
      text-decoration: underline;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes slideIn {
      from { transform: translateX(-10px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    
    .nav-item {
      animation: fadeIn 0.5s ease-out;
      animation-fill-mode: both;
    }
    
    .nav-item:nth-child(1) { animation-delay: 0.1s; }
    .nav-item:nth-child(2) { animation-delay: 0.2s; }
    .nav-item:nth-child(3) { animation-delay: 0.3s; }
    .nav-item:nth-child(4) { animation-delay: 0.4s; }
    .nav-item:nth-child(5) { animation-delay: 0.5s; }
    .nav-item:nth-child(6) { animation-delay: 0.6s; }
    
    .category-btn {
      animation: slideIn 0.3s ease-out;
      animation-fill-mode: both;
    }
    
    .category-btn:nth-child(1) { animation-delay: 0.05s; }
    .category-btn:nth-child(2) { animation-delay: 0.1s; }
    .category-btn:nth-child(3) { animation-delay: 0.15s; }
    .category-btn:nth-child(4) { animation-delay: 0.2s; }
    .category-btn:nth-child(5) { animation-delay: 0.25s; }
    
    @media (max-width: 768px) {
      .main-header {
        height: auto;
        padding: 15px 0;
      }
      
      .header-container {
        flex-direction: column;
        align-items: flex-start;
        gap: 15px;
      }
      
      .nav-grid {
        grid-template-columns: 1fr;
      }
      
      .category-filter {
        overflow-x: auto;
        padding-bottom: 10px;
        flex-wrap: nowrap;
        scrollbar-width: none;
        -ms-overflow-style: none;
      }
      
      .category-filter::-webkit-scrollbar {
        display: none;
      }
      
      .search-box input {
        padding: 12px 20px 12px 45px;
      }
      
      /* 移动设备上的公告轮播样式 */
      .announcement-container {
        flex-direction: column;
        padding: 15px;
      }
      
      .announcement-content {
        width: 100%;
        margin-bottom: 10px;
        text-align: center;
        justify-content: center;
      }
      
      .announcement-controls {
        width: 100%;
        justify-content: center;
      }
      
      .announcement-item {
        padding: 5px 0;
      }
    }
  </style>
</head>
<body>
  <header class="main-header">
    <div class="container header-container">
      <div class="logo">
        <i class="fas fa-compass logo-icon"></i>
        <h1>Skk-Panel</h1>
      </div>
      <a href="/admin" class="admin-link"><i class="fas fa-cog"></i> 管理</a>
    </div>
  </header>
  
  <main class="main-content">
    <div class="container">
      <!-- 公告轮播区域 -->
      <div class="announcement-carousel">
        <div class="announcement-container">
          <div class="announcement-content" id="announcementContent">
            <!-- 公告内容将通过JavaScript动态添加 -->
          </div>
          <div class="announcement-controls">
            <button class="announcement-btn" id="prevAnnouncement">
              <i class="fas fa-chevron-left"></i>
            </button>
            <button class="announcement-btn" id="nextAnnouncement">
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
      
      <div class="content-header">
        <div class="search-box">
          <input type="text" id="searchInput" placeholder="搜索导航...">
          <i class="fas fa-search"></i>
        </div>
        
        <div class="category-filter" id="categoryFilter">
          <button class="category-btn active" data-category="all">全部</button>
          <!-- 分类按钮将通过JavaScript动态添加 -->
        </div>
      </div>
      
      <div class="nav-grid" id="navGrid">
        <!-- 导航项将通过JavaScript动态添加 -->
      </div>
    </div>
  </main>
  
  <footer class="footer">
    <div class="container">
      <p>© 2025 Skk-Panel | 使用 <a href="https://workers.cloudflare.com/" target="_blank">Cloudflare Workers</a> 构建 | <a href="https://github.com/omskk/skk-panel" target="_blank"><i class="fab fa-github"></i> GitHub</a> | 作者: Atlas</p>
    </div>
  </footer>

  <script>
    
    // 存储公告数据
    let announcements = [];
    
    // 当前公告索引
    let currentAnnouncementIndex = 0;
    
    // 获取公告数据
    // 注意：这个函数会在客户端执行，不会在Worker环境中执行
    async function fetchAnnouncements() {
      try {
        const response = await fetch('/api/announcements');
        if (!response.ok) throw new Error('获取公告数据失败');
        announcements = await response.json();
        initAnnouncements();
      } catch (error) {
        console.error('Error fetching announcements:', error);
        // 如果获取失败，使用默认公告
        announcements = [
          {
            id: 'default1',
            title: '欢迎公告',
            content: '欢迎使用Skk-Panel，这里收集了各种有用的网站链接！',
            icon: 'fa-bullhorn'
          }
        ];
        initAnnouncements();
      }
    }
    
    // 初始化公告
    function initAnnouncements() {
      const announcementContent = document.getElementById('announcementContent');
      
      // 清空内容
      announcementContent.innerHTML = '';
      
      // 如果没有公告，隐藏公告区域
      if (announcements.length === 0) {
        document.querySelector('.announcement-carousel').style.display = 'none';
        return;
      }
      
      // 显示公告区域
      document.querySelector('.announcement-carousel').style.display = 'block';
      
      // 添加公告项
      announcements.forEach((announcement, index) => {
        const announcementItem = document.createElement('div');
        announcementItem.className = 'announcement-item' + (index === 0 ? ' active' : '');
        announcementItem.dataset.id = announcement.id;
        
        // 创建图标元素
        const iconElement = document.createElement('i');
        iconElement.className = 'fas fa-bullhorn';
        iconElement.style.color = 'var(--primary-color)';
        
        // 创建标题元素
        const titleElement = document.createElement('span');
        titleElement.className = 'announcement-title';
        titleElement.textContent = announcement.title + ': ';
        
        // 创建内容元素，只显示一行，多余内容用省略号表示
        const contentElement = document.createElement('span');
        contentElement.className = 'announcement-text';
        contentElement.textContent = announcement.content;
        contentElement.style.whiteSpace = 'nowrap';
        contentElement.style.overflow = 'hidden';
        contentElement.style.textOverflow = 'ellipsis';
        contentElement.style.maxWidth = '100%';
        contentElement.style.display = 'block';
        
        // 添加到公告项
        announcementItem.appendChild(iconElement);
        announcementItem.appendChild(titleElement);
        announcementItem.appendChild(contentElement);
        
        // 添加点击事件，显示完整公告
        announcementItem.addEventListener('click', () => showFullAnnouncement(announcement));
        
        // 添加到公告容器
        announcementContent.appendChild(announcementItem);
      });
      
      // 重置当前索引
      currentAnnouncementIndex = 0;
      
      // 添加按钮事件监听
      document.getElementById('prevAnnouncement').addEventListener('click', (e) => {
        e.stopPropagation(); // 阻止事件冒泡
        showPrevAnnouncement();
      });
      document.getElementById('nextAnnouncement').addEventListener('click', (e) => {
        e.stopPropagation(); // 阻止事件冒泡
        showNextAnnouncement();
      });
    }
    
    // 显示完整公告内容
    function showFullAnnouncement(announcement) {
      // 创建模态弹窗
      const modal = document.createElement('div');
      modal.className = 'modal announcement-modal';
      modal.style.display = 'block';
      modal.style.position = 'fixed';
      modal.style.zIndex = '1000';
      modal.style.left = '0';
      modal.style.top = '0';
      modal.style.width = '100%';
      modal.style.height = '100%';
      modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
      modal.style.overflow = 'auto';
      
      // 创建模态内容区域
      const modalContent = document.createElement('div');
      modalContent.className = 'modal-content';
      modalContent.style.backgroundColor = 'var(--card-bg)';
      modalContent.style.margin = '10% auto';
      modalContent.style.padding = '25px';
      modalContent.style.border = '1px solid var(--border-color)';
      modalContent.style.borderRadius = 'var(--radius-md)';
      modalContent.style.width = '80%';
      modalContent.style.maxWidth = '600px';
      modalContent.style.boxShadow = 'var(--shadow-lg)';
      modalContent.style.position = 'relative';
      modalContent.style.animation = 'fadeIn 0.3s ease-out';
      
      // 创建模态头部
      const modalHeader = document.createElement('div');
      modalHeader.className = 'modal-header';
      modalHeader.style.display = 'flex';
      modalHeader.style.justifyContent = 'space-between';
      modalHeader.style.alignItems = 'center';
      modalHeader.style.borderBottom = '1px solid var(--border-color)';
      modalHeader.style.paddingBottom = '15px';
      modalHeader.style.marginBottom = '20px';
      
      // 创建标题
      const modalTitle = document.createElement('h2');
      modalTitle.className = 'modal-title';
      
      // 创建图标
      const titleIcon = document.createElement('i');
      titleIcon.className = 'fas fa-bullhorn';
      titleIcon.style.color = 'var(--primary-color)';
      modalTitle.appendChild(titleIcon);
      
      // 添加标题文本
      modalTitle.appendChild(document.createTextNode(' ' + announcement.title));
      
      // 创建关闭按钮
      const closeButton = document.createElement('button');
      closeButton.className = 'modal-close';
      closeButton.style.backgroundColor = 'transparent';
      closeButton.style.border = 'none';
      closeButton.style.fontSize = '1.5rem';
      closeButton.style.cursor = 'pointer';
      closeButton.style.color = 'var(--text-light)';
      closeButton.style.transition = 'var(--transition)';
      closeButton.style.padding = '5px';
      closeButton.style.borderRadius = 'var(--radius-sm)';
      closeButton.style.display = 'flex';
      closeButton.style.alignItems = 'center';
      closeButton.style.justifyContent = 'center';
      
      // 添加悬停效果
      closeButton.addEventListener('mouseover', () => {
        closeButton.style.color = 'var(--danger-color)';
        closeButton.style.backgroundColor = 'var(--danger-color)';
        closeButton.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
      });
      closeButton.addEventListener('mouseout', () => {
        closeButton.style.color = 'var(--text-light)';
        closeButton.style.backgroundColor = 'transparent';
      });
      
      const closeIcon = document.createElement('i');
      closeIcon.className = 'fas fa-times';
      closeButton.appendChild(closeIcon);
      
      // 创建模态内容主体
      const modalBody = document.createElement('div');
      modalBody.className = 'modal-body';
      modalBody.style.padding = '5px 10px';
      modalBody.style.fontSize = '1rem';
      modalBody.style.lineHeight = '1.8';
      modalBody.style.color = 'var(--text-color)';
      modalBody.style.maxHeight = '60vh';
      modalBody.style.overflowY = 'auto';
      
      // 创建内容段落
      const contentPara = document.createElement('p');
      contentPara.innerHTML = announcement.content.replace(new RegExp('\\n', 'g'), '<br>');
      contentPara.style.margin = '0 0 10px 0';
      contentPara.style.padding = '0';
      contentPara.style.wordBreak = 'break-word';
      contentPara.style.whiteSpace = 'pre-wrap';
      contentPara.style.textAlign = 'justify';
      contentPara.style.letterSpacing = '0.5px';
      
      // 组装模态框
      modalHeader.appendChild(modalTitle);
      modalHeader.appendChild(closeButton);
      modalBody.appendChild(contentPara);
      modalContent.appendChild(modalHeader);
      modalContent.appendChild(modalBody);
      modal.appendChild(modalContent);
      
      // 添加到页面
      document.body.appendChild(modal);
      
      // 添加关闭事件
      modal.querySelector('.modal-close').addEventListener('click', () => {
        document.body.removeChild(modal);
      });
      
      // 点击模态框外部关闭
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          document.body.removeChild(modal);
        }
      });
    }
    
    // 显示上一个公告
    function showPrevAnnouncement() {
      const announcementItems = document.querySelectorAll('.announcement-item');
      announcementItems[currentAnnouncementIndex].classList.remove('active');
      
      currentAnnouncementIndex--;
      if (currentAnnouncementIndex < 0) {
        currentAnnouncementIndex = announcements.length - 1;
      }
      
      announcementItems[currentAnnouncementIndex].classList.add('active');
    }
    
    // 显示下一个公告
    function showNextAnnouncement() {
      const announcementItems = document.querySelectorAll('.announcement-item');
      announcementItems[currentAnnouncementIndex].classList.remove('active');
      
      currentAnnouncementIndex++;
      if (currentAnnouncementIndex >= announcements.length) {
        currentAnnouncementIndex = 0;
      }
      
      announcementItems[currentAnnouncementIndex].classList.add('active');
    }
    
    // 页面加载完成后获取公告数据
    document.addEventListener('DOMContentLoaded', fetchAnnouncements);
    
    // 默认公告数据 - 仅在获取API数据失败时使用
    // 注意：currentAnnouncementIndex变量已在前面声明，用于跟踪当前显示的公告
    
    // 显示下一个公告
    function showNextAnnouncement() {
      const announcementItems = document.querySelectorAll('.announcement-item');
      announcementItems[currentAnnouncementIndex].classList.remove('active');
      
      currentAnnouncementIndex++;
      if (currentAnnouncementIndex >= announcements.length) {
        currentAnnouncementIndex = 0;
      }
      
      announcementItems[currentAnnouncementIndex].classList.add('active');
    }
    
    // 页面加载完成后初始化公告
    document.addEventListener('DOMContentLoaded', initAnnouncements);
    
    // 获取导航链接数据
    fetch('/api/links')
      .then(response => response.json())
      .then(links => {
        const navGrid = document.getElementById('navGrid');
        
        // 保存原始链接数据，用于搜索和过滤
        originalLinks = links;
        
        if (links.length === 0) {
          navGrid.innerHTML = 
            '<div class="empty-state" style="grid-column: 1/-1;">' +
              '<i class="fas fa-compass"></i>' +
              '<h3>暂无导航链接</h3>' +
              '<p>还没有添加任何导航链接，请前往管理页面添加。</p>' +
              '<a href="/admin" class="admin-link"><i class="fas fa-plus-circle"></i> 添加导航</a>' +
            '</div>';
          return;
        }
        
        // 设置分类过滤器
        setupCategories(links);
        
        // 渲染导航链接
        renderLinks(links);
        
        // 设置搜索功能
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', () => {
          const searchTerm = searchInput.value.toLowerCase().trim();
          filterLinks(searchTerm);
        });
      })
      .catch(error => {
        console.error('Error fetching links:', error);
        document.getElementById('navGrid').innerHTML = 
          '<div class="empty-state" style="grid-column: 1/-1;">' +
            '<i class="fas fa-exclamation-circle"></i>' +
            '<h3>获取导航链接失败</h3>' +
            '<p>加载导航链接时出现错误，请稍后再试。</p>' +
          '</div>';
      });
    
    // 设置分类过滤器
    function setupCategories(links) {
      const categoriesContainer = document.getElementById('categoryFilter');
      const categories = new Set();
      
      // 清空现有的分类按钮，避免重复添加
      categoriesContainer.innerHTML = '';
      
      // 收集所有分类
      links.forEach(link => {
        if (link.category && link.category.trim() !== '') {
          categories.add(link.category.trim());
        }
      });
      
      // 如果有分类，创建分类按钮
      if (categories.size > 0) {
        // 添加"全部"按钮
        const allBtn = document.createElement('button');
        allBtn.className = 'category-btn active';
        allBtn.textContent = '全部';
        allBtn.dataset.category = 'all';
        categoriesContainer.appendChild(allBtn);
        
        // 添加各个分类按钮
        categories.forEach(category => {
          const categoryBtn = document.createElement('button');
          categoryBtn.className = 'category-btn';
          categoryBtn.textContent = category;
          categoryBtn.dataset.category = category;
          categoriesContainer.appendChild(categoryBtn);
        });
        
        // 添加点击事件
        const categoryBtns = document.querySelectorAll('.category-btn');
        categoryBtns.forEach(btn => {
          btn.addEventListener('click', () => {
            // 移除所有按钮的active类
            categoryBtns.forEach(b => b.classList.remove('active'));
            // 添加当前按钮的active类
            btn.classList.add('active');
            
            // 过滤链接
            const category = btn.dataset.category;
            const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
            filterLinks(searchTerm, category);
          });
        });
      } else {
        // 如果没有分类，隐藏分类容器
        categoriesContainer.style.display = 'none';
      }
    }
    
    // 渲染导航链接
    function renderLinks(links) {
      const navGrid = document.getElementById('navGrid');
      navGrid.innerHTML = '';
      
      links.forEach(link => {
        const navItem = document.createElement('div');
        navItem.className = 'nav-item';
        navItem.dataset.category = link.category || '';
        
        // 创建整个卡片的点击区域
        const cardLink = document.createElement('a');
        cardLink.href = link.url;
        cardLink.target = '_blank';
        cardLink.className = 'card-link';
        navItem.appendChild(cardLink);
        
        // 创建标题元素
        const titleElement = document.createElement('div');
        titleElement.className = 'nav-item-title';
        titleElement.innerHTML = '<i class="fas fa-external-link-alt"></i>' + link.title;
        cardLink.appendChild(titleElement);
        
        // 创建描述元素
        const description = document.createElement('p');
        description.textContent = link.description || '暂无描述';
        cardLink.appendChild(description);
        
        // 如果有分类，添加分类标签
        if (link.category && link.category.trim() !== '') {
          const categoryTag = document.createElement('span');
          categoryTag.className = 'nav-item-category';
          categoryTag.textContent = link.category;
          cardLink.appendChild(categoryTag);
        }
        
        navGrid.appendChild(navItem);
      });
    }
    
    // 保存原始导航链接数据
    let originalLinks = [];
    
    // 过滤链接
    function filterLinks(searchTerm, category = 'all') {
      const navGrid = document.getElementById('navGrid');
      
      // 如果当前显示的是空状态，需要重新渲染原始链接
      if (navGrid.querySelector('.empty-state')) {
        renderLinks(originalLinks);
      }
      
      const navItems = document.querySelectorAll('.nav-item');
      let hasVisibleItems = false;
      
      navItems.forEach(item => {
        const title = item.querySelector('.nav-item-title').textContent.toLowerCase();
        const description = item.querySelector('p').textContent.toLowerCase();
        const itemCategory = item.dataset.category;
        
        // 检查是否匹配搜索词 (同时检索标题和描述)
        const matchesSearch = searchTerm === '' || 
                             title.includes(searchTerm) ||
                             description.includes(searchTerm);
        
        // 检查是否匹配分类
        const matchesCategory = category === 'all' || itemCategory === category;
        
        // 同时匹配搜索词和分类才显示
        if (matchesSearch && matchesCategory) {
          item.style.display = '';
          hasVisibleItems = true;
        } else {
          item.style.display = 'none';
        }
      });
      
      // 如果没有匹配项，显示空状态
      if (!hasVisibleItems) {
        const emptyState = document.createElement('div');
        emptyState.className = 'empty-state';
        emptyState.style.gridColumn = '1/-1';
        emptyState.innerHTML = 
          '<i class="fas fa-search"></i>' +
          '<h3>未找到匹配结果</h3>' +
          '<p>尝试使用不同的搜索词或分类</p>';
        
        // 清空网格并添加空状态
        navGrid.innerHTML = '';
        navGrid.appendChild(emptyState);
      }
    }
  </script>
</body>
</html>
`;

// HTML模板 - 管理页面
const ADMIN_HTML = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Skk-Panel | 管理控制台</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary-color: #4361ee;
      --primary-hover: #3a56d4;
      --primary-light: #eef2ff;
      --secondary-color: #f72585;
      --secondary-hover: #e5177a;
      --secondary-light: #ffeef8;
      --success-color: #10b981;
      --warning-color: #f59e0b;
      --danger-color: #ef4444;
      --text-color: #1e293b;
      --text-light: #64748b;
      --text-lighter: #94a3b8;
      --border-color: #e2e8f0;
      --bg-color: #f8fafc;
      --card-bg: #ffffff;
      --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.05);
      --shadow-md: 0 5px 15px rgba(0, 0, 0, 0.07);
      --shadow-lg: 0 10px 25px rgba(0, 0, 0, 0.1);
      --shadow-hover: 0 10px 20px rgba(67, 97, 238, 0.15);
      --radius-sm: 8px;
      --radius-md: 12px;
      --radius-lg: 20px;
      --radius-full: 9999px;
      --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      --header-height: 70px;
      --toast-success: #10b981;
      --toast-danger: #ef4444;
      --toast-warning: #f59e0b;
      --toast-info: #3b82f6;
    }
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      line-height: 1.6;
      color: var(--text-color);
      background-color: var(--bg-color);
      padding: 0;
      min-height: 100vh;
    }
    
    .container {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 20px;
    }
    
    .main-header {
      height: var(--header-height);
      background-color: var(--card-bg);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
      position: sticky;
      top: 0;
      z-index: 100;
    }
    
    .header-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;
    }
    
    .logo {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .logo h1 {
      margin: 0;
      color: var(--text-color);
      font-size: 1.5rem;
      font-weight: 700;
      background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .logo-icon {
      font-size: 1.8rem;
      color: var(--primary-color);
    }
    
    .header-actions {
      display: flex;
      gap: 12px;
    }
    
    .btn {
      font-family: inherit;
      font-weight: 600;
      font-size: 15px;
      padding: 10px 18px;
      border-radius: var(--radius-full);
      cursor: pointer;
      transition: var(--transition);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      border: none;
      box-shadow: var(--shadow-sm);
    }
    
    .btn-primary {
      background-color: var(--primary-color);
      color: white;
    }
    
    .btn-primary:hover {
      background-color: var(--primary-hover);
      transform: translateY(-2px);
      box-shadow: var(--shadow-hover);
    }
    
    .btn-secondary {
      background-color: var(--card-bg);
      color: var(--text-color);
      border: 2px solid var(--border-color);
    }
    
    .btn-secondary:hover {
      border-color: var(--primary-color);
      color: var(--primary-color);
      transform: translateY(-2px);
      box-shadow: var(--shadow-sm);
    }
    
    .btn-danger {
      background-color: var(--danger-color);
      color: white;
    }
    
    .btn-danger:hover {
      background-color: #dc2626;
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(239, 68, 68, 0.15);
    }
    
    .btn-sm {
      padding: 6px 12px;
      font-size: 14px;
    }
    
    .main-content {
      padding: 40px 0;
    }
    
    .section-title {
      margin-bottom: 25px;
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--text-color);
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .section-title i {
      color: var(--primary-color);
    }
    
    .nav-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 25px;
      margin-bottom: 40px;
    }
    
    .nav-item {
      background-color: var(--card-bg);
      border-radius: var(--radius-md);
      padding: 25px;
      transition: var(--transition);
      border: 1px solid var(--border-color);
      box-shadow: var(--shadow-sm);
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      animation: fadeIn 0.5s ease-out;
      animation-fill-mode: both;
    }
    
    .nav-item::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
      opacity: 0;
      transition: var(--transition);
    }
    
    .nav-item:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-hover);
      border-color: rgba(67, 97, 238, 0.2);
    }
    
    .nav-item:hover::before {
      opacity: 1;
    }
    
    .nav-item a {
      text-decoration: none;
      color: var(--text-color);
      font-weight: 700;
      font-size: 1.2em;
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 12px;
      transition: var(--transition);
    }
    
    .nav-item a:hover {
      color: var(--primary-color);
    }
    
    .nav-item a i {
      color: var(--primary-color);
      font-size: 0.9em;
    }
    
    .nav-item p {
      color: var(--text-light);
      font-size: 0.95em;
      margin: 5px 0 15px;
      line-height: 1.5;
      flex-grow: 1;
    }
    
    .actions {
      display: flex;
      gap: 10px;
      justify-content: flex-end;
      margin-top: auto;
    }
    
    .admin-panel {
      background-color: var(--card-bg);
      border-radius: var(--radius-md);
      padding: 30px;
      box-shadow: var(--shadow-md);
      border: 1px solid var(--border-color);
      animation: fadeIn 0.5s ease-out;
    }
    
    .admin-panel .btn {
      margin-right: 10px;
      margin-bottom: 10px;
      transition: var(--transition);
      box-shadow: var(--shadow-sm);
      border-radius: var(--radius-full);
    }
    
    .admin-panel .btn:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-hover);
    }
    
    .admin-panel .btn-add {
      margin-bottom: 20px;
      background-color: var(--primary-color);
      color: white;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
    
    .admin-panel .btn-add:hover {
      background-color: var(--primary-hover);
    }
    
    .actions .btn {
      padding: 8px 12px;
      font-size: 14px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    
    .actions .btn-edit {
      background-color: var(--primary-light);
      color: var(--primary-color);
      border: 1px solid var(--primary-color);
    }
    
    .actions .btn-edit:hover {
      background-color: var(--primary-color);
      color: white;
    }
    
    .actions .btn-delete {
      background-color: #fee2e2;
      color: var(--danger-color);
      border: 1px solid var(--danger-color);
    }
    
    .actions .btn-delete:hover {
      background-color: var(--danger-color);
      color: white;
    }
    
    .form-group {
      margin-bottom: 20px;
    }
    
    label {
      display: block;
      margin-bottom: 8px;
      font-weight: 600;
      color: var(--text-color);
    }
    
    input, textarea {
      width: 100%;
      padding: 12px 16px;
      border: 2px solid var(--border-color);
      border-radius: var(--radius-md);
      font-size: 16px;
      font-family: inherit;
      transition: var(--transition);
      color: var(--text-color);
    }
    
    input:focus, textarea:focus {
      border-color: var(--primary-color);
      outline: none;
      box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.15);
    }
    
    .form-actions {
      display: flex;
      gap: 12px;
      margin-top: 20px;
    }
    
    .alert {
      padding: 16px 20px;
      border-radius: var(--radius-md);
      margin-bottom: 20px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 10px;
      animation: fadeIn 0.5s ease-out;
    }
    
    .alert-danger {
      background-color: #fee2e2;
      color: var(--danger-color);
      border: 1px solid rgba(239, 68, 68, 0.2);
    }
    
    .alert-success {
      background-color: #d1fae5;
      color: var(--success-color);
      border: 1px solid rgba(16, 185, 129, 0.2);
    }
    
    .empty-state {
      text-align: center;
      padding: 40px 20px;
      background-color: var(--primary-light);
      border-radius: var(--radius-md);
      margin-bottom: 30px;
      color: var(--primary-color);
      border: 1px dashed rgba(67, 97, 238, 0.3);
    }
    
    .empty-state i {
      font-size: 3rem;
      margin-bottom: 15px;
      opacity: 0.8;
    }
    
    .empty-state h3 {
      font-size: 1.5rem;
      margin-bottom: 10px;
    }
    
    .empty-state p {
      color: var(--text-light);
      margin-bottom: 20px;
    }
    
    /* 模态弹窗样式 */
    .modal {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 1000;
      justify-content: center;
      align-items: center;
      animation: fadeIn 0.3s ease-out;
    }
    
    .modal.show {
      display: flex;
    }
    
    .modal-content {
      background-color: var(--card-bg);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-lg);
      width: 90%;
      max-width: 600px;
      max-height: 90vh;
      overflow-y: auto;
      position: relative;
      animation: modalSlideIn 0.3s ease-out;
    }
    
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 25px;
      border-bottom: 1px solid var(--border-color);
    }
    
    .modal-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--text-color);
      margin: 0;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .modal-title i {
      color: var(--primary-color);
    }
    
    .modal-close {
      background: none;
      border: none;
      font-size: 1.5rem;
      color: var(--text-lighter);
      cursor: pointer;
      transition: var(--transition);
    }
    
    .modal-close:hover {
      color: var(--danger-color);
      transform: scale(1.1);
    }
    
    .modal-body {
      padding: 25px;
    }
    
    .action-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
      padding: 15px 20px;
      background-color: var(--card-bg);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-sm);
      border: 1px solid var(--border-color);
    }
    
    .message-container {
      flex-grow: 1;
      margin-left: 20px;
    }
    
    .add-button-container {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 30px;
    }
    
    .btn-add {
      background-color: var(--primary-color);
      color: white;
      padding: 12px 24px;
      font-size: 16px;
      font-weight: 600;
      border-radius: var(--radius-full);
      box-shadow: var(--shadow-md);
      transition: var(--transition);
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .btn-add:hover {
      background-color: var(--primary-hover);
      transform: translateY(-2px);
      box-shadow: var(--shadow-hover);
    }
    
    @keyframes modalSlideIn {
      from { opacity: 0; transform: translateY(-30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .nav-item:nth-child(1) { animation-delay: 0.1s; }
    .nav-item:nth-child(2) { animation-delay: 0.2s; }
    .nav-item:nth-child(3) { animation-delay: 0.3s; }
    .nav-item:nth-child(4) { animation-delay: 0.4s; }
    .nav-item:nth-child(5) { animation-delay: 0.5s; }
    
    @media (max-width: 768px) {
      .main-header {
        height: auto;
        padding: 15px 0;
      }
      
      .header-container {
        flex-direction: column;
        align-items: flex-start;
        gap: 15px;
      }
      
      .header-actions {
        width: 100%;
        justify-content: flex-end;
      }
      
      .action-bar {
        flex-direction: column;
        align-items: stretch;
        gap: 15px;
      }
      
      .message-container {
        margin-left: 0;
        margin-top: 10px;
        width: 100%;
      }
      
      .nav-grid {
        grid-template-columns: 1fr;
      }
      
      .actions {
        flex-direction: column;
      }
      
      .actions button {
        width: 100%;
      }
      
      .admin-panel {
        padding: 20px;
      }
    }
  </style>
</head>
<body>
  <header class="main-header">
    <div class="container header-container">
      <div class="logo">
        <i class="fas fa-rocket logo-icon"></i>
        <h1>Skk-Panel 控制中心</h1>
      </div>
      <div class="header-actions">
        <a href="/" class="btn btn-secondary"><i class="fas fa-home"></i> 返回首页</a>
        <button id="logoutBtn" class="btn btn-primary"><i class="fas fa-sign-out-alt"></i> 退出登录</button>
      </div>
    </div>
  </header>
  
  <main class="main-content">
    <div class="container">
      
      <!-- 选项卡导航 -->
      <div class="tab-navigation" style="display:flex; justify-content:space-between; margin-bottom:30px; border-bottom:2px solid var(--border-color); background-color:var(--card-bg); border-radius:var(--radius-md) var(--radius-md) 0 0; padding:5px 15px; box-shadow:var(--shadow-sm);">
        <div style="display:flex;">
          <button id="announcementTabBtn" class="tab-btn active" style="padding:15px 25px; font-weight:700; background:none; border:none; border-bottom:3px solid var(--primary-color); color:var(--primary-color); cursor:pointer; margin-right:15px; transition:var(--transition); font-size:16px;">
            <i class="fas fa-bullhorn"></i> 公告管理
          </button>
          <button id="navTabBtn" class="tab-btn" style="padding:15px 25px; font-weight:700; background:none; border:none; border-bottom:3px solid transparent; color:var(--text-light); cursor:pointer; transition:var(--transition); font-size:16px;">
            <i class="fas fa-link"></i> 导航管理
          </button>
        </div>
        <div id="tabActionButtons" style="display:flex; align-items:center;">
          <button id="addAnnouncementBtn" class="btn-add" style="background:linear-gradient(90deg, var(--primary-color), var(--secondary-color)); color:white; border:none; border-radius:var(--radius-full); padding:10px 20px; display:flex; align-items:center; gap:8px; font-weight:700; cursor:pointer; transition:var(--transition); box-shadow:var(--shadow-md);">
            <i class="fas fa-plus-circle"></i> 添加公告
          </button>
          <button id="addNewBtn" class="btn-add" style="background:linear-gradient(90deg, var(--primary-color), var(--secondary-color)); color:white; border:none; border-radius:var(--radius-full); padding:10px 20px; display:flex; align-items:center; gap:8px; font-weight:700; cursor:pointer; transition:var(--transition); box-shadow:var(--shadow-md); display:none;">
            <i class="fas fa-plus-circle"></i> 添加导航
          </button>
        </div>
      </div>
      
      <!-- 公告管理面板 -->
      <div id="announcementTabPanel" class="tab-panel active" style="display:block;">
        <div class="admin-panel" id="announcementPanel" style="padding-top:10px;">
          <!-- 公告项将通过JavaScript动态添加 -->
        </div>
      </div>
      
      <!-- 公告模态弹窗 -->
      <div id="announcementModal" class="modal">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title"><i class="fas fa-bullhorn"></i> <span id="announcementModalTitle">添加公告</span></h2>
            <button class="modal-close" id="closeAnnouncementModal"><i class="fas fa-times"></i></button>
          </div>
          <div class="modal-body">
            <form id="announcementForm">
              <div class="form-group">
                <label for="announcementTitle">标题</label>
                <input type="text" id="announcementTitle" required placeholder="输入公告标题">
              </div>
              <div class="form-group">
                <label for="announcementContent">内容</label>
                <textarea id="announcementContent" rows="5" required placeholder="输入公告内容，支持换行"></textarea>
              </div>
              <div class="form-group" id="announcementIdGroup" style="display:none;">
                <label for="announcementIdDisplay">公告ID</label>
                <div style="display:flex; align-items:center; margin-bottom:10px;">
                  <input type="text" id="announcementIdDisplay" readonly style="background-color:var(--bg-color);">
                </div>
              </div>
              <input type="hidden" id="announcementIcon" value="fa-bullhorn">
              <input type="hidden" id="announcementEditId">
              <div class="form-actions">
                <button type="submit" id="saveAnnouncementBtn" class="btn btn-primary"><i class="fas fa-save"></i> 保存</button>
                <button type="button" id="cancelAnnouncementBtn" class="btn btn-secondary"><i class="fas fa-times"></i> 取消</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <!-- 导航链接管理面板 -->
      <div id="navTabPanel" class="tab-panel" style="display:none;">
        <div class="nav-grid" id="navGrid" style="padding-top:10px;">
          <!-- 导航项将通过JavaScript动态添加 -->
        </div>
      </div>
      
      <!-- 导航模态弹窗 -->
      <div id="navModal" class="modal">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title"><i class="fas fa-plus-circle"></i> <span id="modalTitle">添加导航链接</span></h2>
            <button class="modal-close" id="closeModal"><i class="fas fa-times"></i></button>
          </div>
          <div class="modal-body">
            <form id="addForm">
              <div class="form-group">
                <label for="title">标题</label>
                <input type="text" id="title" required placeholder="输入网站名称">
              </div>
              <div class="form-group">
                <label for="url">URL</label>
                <input type="url" id="url" required placeholder="输入完整网址，包含http://或https://">
              </div>
              <div class="form-group">
                <label for="category">分类</label>
                <input type="text" id="category" placeholder="输入分类名称（可选）">
              </div>
              <div class="form-group">
                <label for="description">描述</label>
                <textarea id="description" rows="3" placeholder="简要描述该网站（可选）"></textarea>
              </div>
              <input type="hidden" id="editId">
              <div class="form-actions">
                <button type="submit" id="saveBtn" class="btn btn-primary"><i class="fas fa-save"></i> 保存</button>
                <button type="button" id="cancelBtn" class="btn btn-secondary"><i class="fas fa-times"></i> 取消</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>

  <script>
    // 页面加载完成后执行
    document.addEventListener('DOMContentLoaded', function() {
      // 初始化获取数据
      fetchNavLinks();
      fetchAnnouncements();
      
      // 添加事件监听
      document.getElementById('addAnnouncementBtn').addEventListener('click', function() {
        resetAnnouncementForm();
        openAnnouncementModal();
      });
      
      document.getElementById('closeAnnouncementModal').addEventListener('click', closeAnnouncementModal);
      document.getElementById('cancelAnnouncementBtn').addEventListener('click', closeAnnouncementModal);
      document.getElementById('announcementForm').addEventListener('submit', saveAnnouncement);
      
      // 选项卡切换功能
      document.getElementById('announcementTabBtn').addEventListener('click', function() {
        switchTab('announcement');
      });
      
      document.getElementById('navTabBtn').addEventListener('click', function() {
        switchTab('nav');
      });
    });
    
    // 切换选项卡
    function switchTab(tabName) {
      // 重置所有选项卡按钮和面板
      document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        btn.style.borderBottomColor = 'transparent';
        btn.style.color = 'var(--text-light)';
      });
      
      document.querySelectorAll('.tab-panel').forEach(panel => {
        panel.style.display = 'none';
      });
      
      // 隐藏所有操作按钮
      document.getElementById('addAnnouncementBtn').style.display = 'none';
      document.getElementById('addNewBtn').style.display = 'none';
      
      // 激活选中的选项卡
      if (tabName === 'announcement') {
        document.getElementById('announcementTabBtn').classList.add('active');
        document.getElementById('announcementTabBtn').style.borderBottomColor = 'var(--primary-color)';
        document.getElementById('announcementTabBtn').style.color = 'var(--primary-color)';
        document.getElementById('announcementTabPanel').style.display = 'block';
        document.getElementById('addAnnouncementBtn').style.display = 'flex';
      } else if (tabName === 'nav') {
        document.getElementById('navTabBtn').classList.add('active');
        document.getElementById('addNewBtn').style.display = 'flex';
        document.getElementById('navTabBtn').style.borderBottomColor = 'var(--primary-color)';
        document.getElementById('navTabBtn').style.color = 'var(--primary-color)';
        document.getElementById('navTabPanel').style.display = 'block';
      }
    }
    
    // 获取公告数据
    async function fetchAnnouncements() {
      try {
        const response = await fetch('/api/announcements');
        if (!response.ok) throw new Error('获取公告数据失败');
        const data = await response.json();
        renderAnnouncements(data);
      } catch (error) {
        showMessage(error.message, 'danger');
      }
    }
    
    // 渲染公告列表
    function renderAnnouncements(announcements) {
      const announcementPanel = document.getElementById('announcementPanel');
      announcementPanel.innerHTML = '';
      
      if (announcements.length === 0) {
        announcementPanel.innerHTML = '<div class="alert alert-info">暂无公告，请添加新公告。</div>';
        return;
      }
      
      // 按创建时间倒序排序
      announcements.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      
      const table = document.createElement('table');
      table.className = 'announcement-table';
      table.style.width = '100%';
      table.style.borderCollapse = 'collapse';
      table.style.marginBottom = '20px';
      table.style.boxShadow = 'var(--shadow-sm)';
      table.style.borderRadius = 'var(--radius-md)';
      table.style.overflow = 'hidden';
      
      // 创建表头
      const thead = document.createElement('thead');
      thead.style.backgroundColor = 'var(--primary-light)';
      const headerRow = document.createElement('tr');
      
      // 创建表头单元格
      const titleHeader = document.createElement('th');
      titleHeader.style.padding = '15px';
      titleHeader.style.textAlign = 'left';
      titleHeader.style.borderBottom = '2px solid var(--primary-color)';
      titleHeader.style.color = 'var(--primary-color)';
      titleHeader.style.fontWeight = '700';
      titleHeader.textContent = '标题';
      
      const contentHeader = document.createElement('th');
      contentHeader.style.padding = '15px';
      contentHeader.style.textAlign = 'left';
      contentHeader.style.borderBottom = '2px solid var(--primary-color)';
      contentHeader.style.color = 'var(--primary-color)';
      contentHeader.style.fontWeight = '700';
      contentHeader.textContent = '内容预览';
      
      const iconHeader = document.createElement('th');
      iconHeader.style.padding = '15px';
      iconHeader.style.textAlign = 'center';
      iconHeader.style.borderBottom = '2px solid var(--primary-color)';
      iconHeader.style.color = 'var(--primary-color)';
      iconHeader.style.fontWeight = '700';
      iconHeader.textContent = '图标';
      
      const actionHeader = document.createElement('th');
      actionHeader.style.padding = '15px';
      actionHeader.style.textAlign = 'right';
      actionHeader.style.borderBottom = '2px solid var(--primary-color)';
      actionHeader.style.color = 'var(--primary-color)';
      actionHeader.style.fontWeight = '700';
      actionHeader.textContent = '操作';
      
      // 添加表头单元格到行
      headerRow.appendChild(titleHeader);
      headerRow.appendChild(contentHeader);
      headerRow.appendChild(iconHeader);
      headerRow.appendChild(actionHeader);
      
      // 添加行到表头
      thead.appendChild(headerRow);
      table.appendChild(thead);
      
      // 创建表体
      const tbody = document.createElement('tbody');
      announcements.forEach((announcement, index) => {
        const tr = document.createElement('tr');
        tr.style.borderBottom = '1px solid var(--border-color)';
        tr.style.transition = 'var(--transition)';
        tr.style.backgroundColor = index % 2 === 0 ? 'var(--card-bg)' : 'var(--bg-color)';
        
        // 添加鼠标悬停效果
        tr.addEventListener('mouseover', () => {
          tr.style.backgroundColor = 'var(--primary-light)';
          tr.style.transform = 'translateY(-2px)';
          tr.style.boxShadow = 'var(--shadow-sm)';
        });
        tr.addEventListener('mouseout', () => {
          tr.style.backgroundColor = index % 2 === 0 ? 'var(--card-bg)' : 'var(--bg-color)';
          tr.style.transform = 'translateY(0)';
          tr.style.boxShadow = 'none';
        });
        
        // 截取内容预览
        const contentPreview = announcement.content.length > 50 
          ? announcement.content.substring(0, 50) + '...' 
          : announcement.content;
        
        // 创建表格单元格
        const titleCell = document.createElement('td');
        titleCell.style.padding = '15px';
        titleCell.style.textAlign = 'left';
        titleCell.style.fontWeight = '600';
        titleCell.style.color = 'var(--text-color)';
        titleCell.textContent = announcement.title;
        
        const contentCell = document.createElement('td');
        contentCell.style.padding = '15px';
        contentCell.style.textAlign = 'left';
        contentCell.style.color = 'var(--text-light)';
        contentCell.style.maxWidth = '400px';
        contentCell.style.overflow = 'hidden';
        contentCell.style.textOverflow = 'ellipsis';
        contentCell.style.whiteSpace = 'nowrap';
        contentCell.textContent = contentPreview;
        
        const iconCell = document.createElement('td');
        iconCell.style.padding = '15px';
        iconCell.style.textAlign = 'center';
        const iconElement = document.createElement('i');
        iconElement.className = 'fas fa-bullhorn';
        iconElement.style.color = 'var(--primary-color)';
        iconElement.style.fontSize = '1.2em';
        iconCell.appendChild(iconElement);
        
        const actionCell = document.createElement('td');
        actionCell.style.padding = '15px';
        actionCell.style.textAlign = 'right';
        
        // 创建编辑按钮
        const editButton = document.createElement('button');
        editButton.className = 'btn btn-sm btn-edit edit-announcement';
        editButton.setAttribute('data-id', announcement.id);
        editButton.style.backgroundColor = 'var(--primary-light)';
        editButton.style.color = 'var(--primary-color)';
        editButton.style.border = 'none';
        editButton.style.borderRadius = 'var(--radius-sm)';
        editButton.style.padding = '8px 15px';
        editButton.style.marginRight = '10px';
        editButton.style.cursor = 'pointer';
        editButton.style.transition = 'var(--transition)';
        editButton.style.fontWeight = '600';
        
        // 添加鼠标悬停效果
        editButton.addEventListener('mouseover', () => {
          editButton.style.backgroundColor = 'var(--primary-color)';
          editButton.style.color = 'white';
          editButton.style.transform = 'translateY(-3px)';
          editButton.style.boxShadow = 'var(--shadow-sm)';
        });
        editButton.addEventListener('mouseout', () => {
          editButton.style.backgroundColor = 'var(--primary-light)';
          editButton.style.color = 'var(--primary-color)';
          editButton.style.transform = 'translateY(0)';
          editButton.style.boxShadow = 'none';
        });
        
        const editIcon = document.createElement('i');
        editIcon.className = 'fas fa-edit';
        editButton.appendChild(editIcon);
        editButton.appendChild(document.createTextNode(' 编辑'));
        
        // 创建删除按钮
        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-sm btn-delete delete-announcement';
        deleteButton.setAttribute('data-id', announcement.id);
        deleteButton.style.backgroundColor = 'var(--secondary-light)';
        deleteButton.style.color = 'var(--secondary-color)';
        deleteButton.style.border = 'none';
        deleteButton.style.borderRadius = 'var(--radius-sm)';
        deleteButton.style.padding = '8px 15px';
        deleteButton.style.cursor = 'pointer';
        deleteButton.style.transition = 'var(--transition)';
        deleteButton.style.fontWeight = '600';
        
        // 添加鼠标悬停效果
        deleteButton.addEventListener('mouseover', () => {
          deleteButton.style.backgroundColor = 'var(--secondary-color)';
          deleteButton.style.color = 'white';
          deleteButton.style.transform = 'translateY(-3px)';
          deleteButton.style.boxShadow = 'var(--shadow-sm)';
        });
        deleteButton.addEventListener('mouseout', () => {
          deleteButton.style.backgroundColor = 'var(--secondary-light)';
          deleteButton.style.color = 'var(--secondary-color)';
          deleteButton.style.transform = 'translateY(0)';
          deleteButton.style.boxShadow = 'none';
        });
        
        const deleteIcon = document.createElement('i');
        deleteIcon.className = 'fas fa-trash-alt';
        deleteButton.appendChild(deleteIcon);
        deleteButton.appendChild(document.createTextNode(' 删除'));
        
        // 添加按钮到操作单元格
        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);
        
        // 添加单元格到行
        tr.appendChild(titleCell);
        tr.appendChild(contentCell);
        tr.appendChild(iconCell);
        tr.appendChild(actionCell);
        
        tbody.appendChild(tr);
      });
      
      table.appendChild(tbody);
      announcementPanel.appendChild(table);
      
      // 添加编辑和删除事件监听
      document.querySelectorAll('.edit-announcement').forEach(btn => {
        btn.addEventListener('click', function() {
          const id = this.getAttribute('data-id');
          editAnnouncement(id, announcements);
        });
      });
      
      document.querySelectorAll('.delete-announcement').forEach(btn => {
        btn.addEventListener('click', function() {
          const id = this.getAttribute('data-id');
          if (confirm('确定要删除这个公告吗？')) {
            deleteAnnouncement(id);
          }
        });
      });
    }
    
    // 添加或更新公告
    async function saveAnnouncement(event) {
      event.preventDefault();
      
      // 获取提交按钮并禁用，防止重复提交
      const submitBtn = document.getElementById('saveAnnouncementBtn');
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 处理中...';
      
      const title = document.getElementById('announcementTitle').value;
      const content = document.getElementById('announcementContent').value;
      // 固定使用fa-bullhorn图标
      const icon = 'fa-bullhorn';
      const editId = document.getElementById('announcementEditId').value;
      
      const announcement = { title, content, icon };
      const isEditing = editId !== '';
      
      try {
        const endpoint = isEditing ? '/api/announcements/' + editId : '/api/announcements';
        const method = isEditing ? 'PUT' : 'POST';
        
        const response = await fetch(endpoint, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(announcement)
        });
        
        if (!response.ok) {
          const error = await response.text();
          throw new Error(error || '保存失败');
        }
        
        closeAnnouncementModal(); // 关闭弹窗
        resetAnnouncementForm();
        fetchAnnouncements();
        showMessage(isEditing ? '公告更新成功！' : '公告添加成功！', 'success');
      } catch (error) {
        showMessage(error.message, 'danger');
        // 恢复按钮状态
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    }
    
    // 编辑公告
    function editAnnouncement(id, announcements) {
      const announcement = announcements.find(a => a.id === id);
      if (!announcement) return;
      
      document.getElementById('announcementTitle').value = announcement.title;
      document.getElementById('announcementContent').value = announcement.content;
      document.getElementById('announcementIcon').value = announcement.icon || 'fa-bullhorn';
      document.getElementById('announcementEditId').value = id;
      
      // 显示公告ID
      document.getElementById('announcementIdGroup').style.display = 'block';
      document.getElementById('announcementIdDisplay').value = id;
      
      // 添加复制JSON数据按钮
      if (!document.getElementById('copyJsonBtn')) {
        const copyBtn = document.createElement('button');
        copyBtn.id = 'copyJsonBtn';
        copyBtn.type = 'button';
        copyBtn.className = 'btn btn-secondary';
        copyBtn.innerHTML = '<i class="fas fa-copy"></i> 复制JSON';
        copyBtn.style.marginLeft = '10px';
        copyBtn.onclick = function() {
          // 创建完整的JSON数据
          const jsonData = JSON.stringify(announcement, null, 2);
          navigator.clipboard.writeText(jsonData)
            .then(() => {
              showMessage('JSON数据已复制到剪贴板', 'success');
              // 临时改变按钮文字
              copyBtn.innerHTML = '<i class="fas fa-check"></i> 已复制';
              setTimeout(() => {
                copyBtn.innerHTML = '<i class="fas fa-copy"></i> 复制JSON';
              }, 2000);
            })
            .catch(err => {
              showMessage('复制失败: ' + err, 'danger');
            });
        };
        
        // 添加到保存按钮旁边
        const saveBtn = document.getElementById('saveAnnouncementBtn');
        saveBtn.parentNode.insertBefore(copyBtn, saveBtn.nextSibling);
      }
      
      document.getElementById('saveAnnouncementBtn').innerHTML = '<i class="fas fa-save"></i> 更新';
      document.getElementById('announcementModalTitle').textContent = '编辑公告';
      
      // 显示弹窗
      openAnnouncementModal();
    }
    
    // 删除公告
    async function deleteAnnouncement(id) {
      // 禁用所有删除按钮，防止重复点击
      const deleteButtons = document.querySelectorAll('button.delete-announcement');
      deleteButtons.forEach(btn => {
        btn.disabled = true;
        if (btn.getAttribute('data-id') === id) {
          const originalHTML = btn.innerHTML;
          btn.setAttribute('data-original-html', originalHTML);
          btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 删除中...';
        }
      });
      
      try {
        const response = await fetch('/api/announcements/' + id, {
          method: 'DELETE'
        });
        
        if (!response.ok) {
          const error = await response.text();
          throw new Error(error || '删除失败');
        }
        
        fetchAnnouncements();
        showMessage('公告删除成功！', 'success');
      } catch (error) {
        showMessage(error.message, 'danger');
        // 恢复所有删除按钮
        deleteButtons.forEach(btn => {
          btn.disabled = false;
          if (btn.getAttribute('data-id') === id) {
            const originalHTML = btn.getAttribute('data-original-html') || '<i class="fas fa-trash-alt"></i> 删除';
            btn.innerHTML = originalHTML;
          }
        });
      }
    }
    
    // 重置公告表单
    function resetAnnouncementForm() {
      document.getElementById('announcementForm').reset();
      document.getElementById('announcementEditId').value = '';
      document.getElementById('announcementIcon').value = 'fa-bullhorn';
      document.getElementById('announcementIdGroup').style.display = 'none';
      document.getElementById('announcementIdDisplay').value = '';
      document.getElementById('saveAnnouncementBtn').innerHTML = '<i class="fas fa-save"></i> 保存';
      document.getElementById('announcementModalTitle').textContent = '添加公告';
      
      // 移除复制JSON按钮
      const copyJsonBtn = document.getElementById('copyJsonBtn');
      if (copyJsonBtn) {
        copyJsonBtn.parentNode.removeChild(copyJsonBtn);
      }
    }
    
    // 打开公告模态弹窗
    function openAnnouncementModal() {
      document.getElementById('announcementModal').classList.add('show');
      document.body.style.overflow = 'hidden'; // 防止背景滚动
    }
    
    // 关闭公告模态弹窗
    function closeAnnouncementModal() {
      document.getElementById('announcementModal').classList.remove('show');
      document.body.style.overflow = '';
    }
    
    // 获取导航数据
    async function fetchNavLinks() {
      try {
        const response = await fetch('/api/links');
        if (!response.ok) throw new Error('获取导航数据失败');
        const data = await response.json();
        renderNavLinks(data);
      } catch (error) {
        showMessage(error.message, 'danger');
      }
    }

    // 渲染导航链接
    function renderNavLinks(links) {
      const navGrid = document.getElementById('navGrid');
      navGrid.innerHTML = '';
      
      if (links.length === 0) {
        navGrid.innerHTML = '<div class="alert alert-info">暂无导航链接，请在下方添加。</div>';
        return;
      }
      
      // 按标题字母顺序排序
      links.sort((a, b) => a.title.localeCompare(b.title, 'zh-CN'));
      
      links.forEach(link => {
        const navItem = document.createElement('div');
        navItem.className = 'nav-item';
        navItem.innerHTML = '<a href="' + link.url + '" target="_blank">' + link.title + '</a><p>' + (link.description || '') + '</p><div class="actions"><button class="btn btn-edit" data-id="' + link.id + '"><i class="fas fa-edit"></i> 编辑</button><button class="btn btn-delete" data-id="' + link.id + '"><i class="fas fa-trash-alt"></i> 删除</button></div>';
        navGrid.appendChild(navItem);
      });
      
      // 添加编辑和删除事件监听
      document.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', function() {
          const id = this.getAttribute('data-id');
          editNavLink(id, links);
        });
      });
      
      document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', function() {
          const id = this.getAttribute('data-id');
          if (confirm('确定要删除这个导航链接吗？')) {
            deleteNavLink(id);
          }
        });
      });
    }

    // 添加或更新导航链接
    async function saveNavLink(event) {
      event.preventDefault();
      
      // 获取提交按钮并禁用，防止重复提交
      const submitBtn = document.getElementById('saveBtn');
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 处理中...';
      
      const title = document.getElementById('title').value;
      const url = document.getElementById('url').value;
      const category = document.getElementById('category').value;
      const description = document.getElementById('description').value;
      const editId = document.getElementById('editId').value;
      
      const link = { title, url, category, description };
      const isEditing = editId !== '';
      
      try {
        const endpoint = isEditing ? '/api/links/' + editId : '/api/links';
        const method = isEditing ? 'PUT' : 'POST';
        
        const response = await fetch(endpoint, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(link)
        });
        
        if (!response.ok) {
          const error = await response.text();
          throw new Error(error || '保存失败');
        }
        
        closeModal(); // 关闭弹窗
        resetForm();
        fetchNavLinks();
        showMessage(isEditing ? '更新成功！' : '添加成功！', 'success');
      } catch (error) {
        showMessage(error.message, 'danger');
        // 恢复按钮状态
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    }

    // 编辑导航链接
    function editNavLink(id, links) {
      const link = links.find(link => link.id === id);
      if (!link) return;
      
      document.getElementById('title').value = link.title;
      document.getElementById('url').value = link.url;
      document.getElementById('category').value = link.category || '';
      document.getElementById('description').value = link.description || '';
      document.getElementById('editId').value = id;
      
      document.getElementById('saveBtn').innerHTML = '<i class="fas fa-save"></i> 更新';
      document.getElementById('modalTitle').textContent = '编辑导航链接';
      
      // 显示弹窗
      openModal();
    }

    // 删除导航链接
    async function deleteNavLink(id) {
      // 禁用所有导航链接的删除按钮，防止重复点击
      // 使用更精确的选择器，只选择导航链接的删除按钮
      const deleteButtons = document.querySelectorAll('#navGrid .btn-delete');
      deleteButtons.forEach(btn => {
        btn.disabled = true;
        if (btn.getAttribute('data-id') === id) {
          const originalHTML = btn.innerHTML;
          btn.setAttribute('data-original-html', originalHTML);
          btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 删除中...';
        }
      });
      
      try {
        const response = await fetch('/api/links/' + id, {
          method: 'DELETE'
        });
        
        if (!response.ok) {
          const error = await response.text();
          throw new Error(error || '删除失败');
        }
        
        fetchNavLinks();
        showMessage('删除成功！', 'success');
      } catch (error) {
        showMessage(error.message, 'danger');
        // 恢复所有删除按钮
        deleteButtons.forEach(btn => {
          btn.disabled = false;
          if (btn.getAttribute('data-id') === id) {
            const originalHTML = btn.getAttribute('data-original-html') || '<i class="fas fa-trash-alt"></i> 删除';
            btn.innerHTML = originalHTML;
          }
        });
      }
    }

    // 重置表单
    function resetForm() {
      document.getElementById('addForm').reset();
      document.getElementById('editId').value = '';
      
      // 恢复保存按钮状态
      const saveBtn = document.getElementById('saveBtn');
      saveBtn.disabled = false;
      saveBtn.innerHTML = '<i class="fas fa-save"></i> 保存';
      document.getElementById('modalTitle').textContent = '添加导航链接';
      closeModal();
    }
    
    // 打开模态弹窗
    function openModal() {
      document.getElementById('navModal').classList.add('show');
      document.body.style.overflow = 'hidden'; // 防止背景滚动
    }
    
    // 关闭模态弹窗
    function closeModal() {
      document.getElementById('navModal').classList.remove('show');
      document.body.style.overflow = '';
    }

    // 显示消息（悬浮窗提醒）
    function showMessage(text, type) {
      // 确保type有值
      if (!type) type = 'danger';
      
      // 创建悬浮消息元素
      const toast = document.createElement('div');
      toast.className = 'toast toast-' + type;
      
      // 根据类型选择图标
      let iconClass = 'fa-exclamation-circle';
      if (type === 'success') {
        iconClass = 'fa-check-circle';
      } else if (type === 'warning') {
        iconClass = 'fa-exclamation-triangle';
      } else if (type === 'info') {
        iconClass = 'fa-info-circle';
      }
      
      // 使用DOM API创建元素，避免模板字符串解析问题
      const toastContent = document.createElement('div');
      toastContent.className = 'toast-content';
      
      const icon = document.createElement('i');
      icon.className = 'fas ' + iconClass;
      toastContent.appendChild(icon);
      
      const span = document.createElement('span');
      span.textContent = text;
      toastContent.appendChild(span);
      
      toast.appendChild(toastContent);
      
      // 设置样式
      toast.style.position = 'fixed';
      toast.style.top = '20px';
      toast.style.right = '20px';
      toast.style.zIndex = '9999';
      toast.style.minWidth = '300px';
      toast.style.padding = '15px 20px';
      toast.style.borderRadius = 'var(--radius-md)';
      toast.style.boxShadow = 'var(--shadow-lg)';
      // 根据消息类型设置背景颜色
      if (type === 'success') {
        toast.style.backgroundColor = 'var(--toast-success)';
      } else if (type === 'danger') {
        toast.style.backgroundColor = 'var(--toast-danger)';
      } else if (type === 'warning') {
        toast.style.backgroundColor = 'var(--toast-warning)';
      } else if (type === 'info') {
        toast.style.backgroundColor = 'var(--toast-info)';
      } else {
        // 默认为danger
        toast.style.backgroundColor = 'var(--toast-danger)';
      }
      toast.style.color = 'white';
      toast.style.transform = 'translateX(120%)';
      toast.style.transition = 'transform 0.3s ease-out';
      toast.style.opacity = '0.95';
      toast.style.display = 'flex';
      toast.style.alignItems = 'center';
      toast.style.justifyContent = 'flex-start';
      toast.style.fontWeight = '600';
      
      // 添加到body
      document.body.appendChild(toast);
      
      // 显示动画
      setTimeout(() => {
        toast.style.transform = 'translateX(0)';
      }, 10);
      
      // 自动关闭
      setTimeout(() => {
        toast.style.transform = 'translateX(120%)';
        setTimeout(() => {
          document.body.removeChild(toast);
        }, 300);
      }, 3000);
    }

    // 退出登录
    async function logout() {
      try {
        const response = await fetch('/api/logout', {
          method: 'POST'
        });
        
        if (!response.ok) {
          throw new Error('退出失败');
        }
        
        // 重定向到登录页
        window.location.href = '/login';
      } catch (error) {
        showMessage(error.message, 'danger');
      }
    }
    
    // 初始化
    document.addEventListener('DOMContentLoaded', function() {
      // 获取数据
      fetchNavLinks();
      fetchAnnouncements();
      
      // 添加新导航按钮点击事件
      document.getElementById('addNewBtn').addEventListener('click', function() {
        resetForm();
        document.getElementById('modalTitle').textContent = '添加导航链接';
        openModal();
      });
      
      // 关闭导航模态弹窗按钮点击事件
      document.getElementById('closeModal').addEventListener('click', closeModal);
      
      // 点击导航模态弹窗外部关闭弹窗
      document.getElementById('navModal').addEventListener('click', function(e) {
        if (e.target === this) {
          closeModal();
        }
      });
      
      // 导航表单提交事件
      document.getElementById('addForm').addEventListener('submit', saveNavLink);
      document.getElementById('cancelBtn').addEventListener('click', resetForm);
      
      // 添加公告相关事件监听
      document.getElementById('addAnnouncementBtn').addEventListener('click', function() {
        resetAnnouncementForm();
        openAnnouncementModal();
      });
      
      // 关闭公告模态弹窗按钮点击事件
      document.getElementById('closeAnnouncementModal').addEventListener('click', closeAnnouncementModal);
      
      // 点击公告模态弹窗外部关闭弹窗
      document.getElementById('announcementModal').addEventListener('click', function(e) {
        if (e.target === this) {
          closeAnnouncementModal();
        }
      });
      
      // 公告表单提交事件
      document.getElementById('announcementForm').addEventListener('submit', saveAnnouncement);
      document.getElementById('cancelAnnouncementBtn').addEventListener('click', closeAnnouncementModal);
      
      // 退出登录事件
      document.getElementById('logoutBtn').addEventListener('click', logout);
    });
  </script>
</body>
</html>
`;
// 登录页面HTML模板
const LOGIN_HTML = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Skk-Panel | 安全登录</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary-color: #4361ee;
      --primary-hover: #3a56d4;
      --primary-light: #eef2ff;
      --secondary-color: #f72585;
      --secondary-hover: #e5177a;
      --secondary-light: #ffeef8;
      --success-color: #10b981;
      --warning-color: #f59e0b;
      --danger-color: #ef4444;
      --text-color: #1e293b;
      --text-light: #64748b;
      --text-lighter: #94a3b8;
      --border-color: #e2e8f0;
      --bg-color: #f8fafc;
      --card-bg: #ffffff;
      --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.05);
      --shadow-md: 0 5px 15px rgba(0, 0, 0, 0.07);
      --shadow-lg: 0 10px 25px rgba(0, 0, 0, 0.1);
      --shadow-hover: 0 10px 20px rgba(67, 97, 238, 0.15);
      --radius-sm: 8px;
      --radius-md: 12px;
      --radius-lg: 20px;
      --radius-full: 9999px;
      --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      line-height: 1.6;
      color: var(--text-color);
      background-color: var(--bg-color);
      background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      padding: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }
    
    .login-container {
      max-width: 420px;
      width: 100%;
      background-color: var(--card-bg);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-lg);
      padding: 40px;
      animation: fadeIn 0.5s ease-out;
      border: 1px solid var(--border-color);
      position: relative;
      overflow: hidden;
    }
    
    .login-container::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 5px;
      background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
    }
    
    .login-header {
      text-align: center;
      margin-bottom: 30px;
    }
    
    .login-header h1 {
      margin: 0;
      color: var(--text-color);
      font-size: 1.8rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
    }
    
    .login-header h1 i {
      color: var(--primary-color);
    }
    
    .login-header p {
      color: var(--text-light);
      margin-top: 10px;
      font-size: 0.95rem;
    }
    
    .form-group {
      margin-bottom: 25px;
    }
    
    label {
      display: block;
      margin-bottom: 10px;
      font-weight: 600;
      color: var(--text-color);
      font-size: 0.95rem;
    }
    
    .input-group {
      position: relative;
    }
    
    .input-group i {
      position: absolute;
      left: 15px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-lighter);
      font-size: 1.1rem;
    }
    
    input {
      width: 100%;
      padding: 14px 15px 14px 45px;
      border: 2px solid var(--border-color);
      border-radius: var(--radius-md);
      font-size: 1rem;
      font-family: inherit;
      transition: var(--transition);
      color: var(--text-color);
    }
    
    input:focus {
      border-color: var(--primary-color);
      outline: none;
      box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.15);
    }
    
    button {
      width: 100%;
      background-color: var(--primary-color);
      color: white;
      border: none;
      padding: 14px 20px;
      border-radius: var(--radius-md);
      cursor: pointer;
      font-size: 1rem;
      font-weight: 600;
      transition: var(--transition);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      box-shadow: var(--shadow-sm);
    }
    
    button:hover {
      background-color: var(--primary-hover);
      transform: translateY(-2px);
      box-shadow: var(--shadow-hover);
    }
    
    .back-link {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      text-align: center;
      margin-top: 25px;
      color: var(--text-light);
      text-decoration: none;
      font-size: 0.95rem;
      font-weight: 500;
      transition: var(--transition);
    }
    
    .back-link:hover {
      color: var(--primary-color);
    }
    
    .alert {
      padding: 16px 20px;
      border-radius: var(--radius-md);
      margin-bottom: 20px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 10px;
      animation: fadeIn 0.5s ease-out;
    }
    
    .alert-danger {
      background-color: #fee2e2;
      color: var(--danger-color);
      border: 1px solid rgba(239, 68, 68, 0.2);
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @media (max-width: 480px) {
      .login-container {
        padding: 30px 20px;
      }
      
      .login-header h1 {
        font-size: 1.5rem;
      }
    }
  </style>
</head>
<body>
  <div class="login-container">
    <div class="login-header">
      <h1><i class="fas fa-lock"></i> Skk-Panel登录</h1>
      <p>请输入管理密码以访问Skk-Panel管理功能</p>
    </div>
    
    <div id="message"></div>
    
    <form id="loginForm">
      <div class="form-group">
        <label for="password">管理密码</label>
        <div class="input-group">
          <i class="fas fa-key"></i>
          <input type="password" id="password" required placeholder="请输入管理密码">
        </div>
      </div>
      <button type="submit"><i class="fas fa-sign-in-alt"></i> 登录</button>
    </form>
    
  </div>

  <script>
    document.getElementById('loginForm').addEventListener('submit', async function(event) {
      event.preventDefault();
      
      // 获取登录按钮并禁用，防止重复提交
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 登录中...';
      
      const password = document.getElementById('password').value;
      
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password })
        });
        
        if (!response.ok) {
          const error = await response.text();
          throw new Error(error || '登录失败');
        }
        
        // 登录成功，重定向到管理页面
        window.location.href = '/';
      } catch (error) {
        const messageEl = document.getElementById('message');
        messageEl.innerHTML = '<div class="alert alert-danger"><i class="fas fa-exclamation-circle"></i> ' + error.message + '</div>';
        
        // 恢复按钮状态
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    });
  </script>
</body>
</html>
`;

// 获取所有导航链接
async function getNavLinks(env) {
  const keys = await env.NAV_LINKS.list({ prefix: 'link:' });
  const links = [];
  
  for (const key of keys.keys) {
    const value = await env.NAV_LINKS.get(key.name);
    if (value) {
      try {
        const link = JSON.parse(value);
        link.id = key.name.replace('link:', '');
        links.push(link);
      } catch (e) {
        console.error('解析链接数据失败:', e);
      }
    }
  }
  
  return links;
}

// 获取所有公告
async function getAnnouncements(env) {
  const keys = await env.NAV_LINKS.list({ prefix: 'announcement:' });
  const announcements = [];
  
  for (const key of keys.keys) {
    const value = await env.NAV_LINKS.get(key.name);
    if (value) {
      try {
        const announcement = JSON.parse(value);
        announcement.id = key.name.replace('announcement:', '');
        announcements.push(announcement);
      } catch (e) {
        console.error('解析公告数据失败:', e);
      }
    }
  }
  
  return announcements;
}

// 验证会话
async function validateSession(request, env) {
  const cookie = request.headers.get('Cookie') || '';
  const sessionMatch = cookie.match(/session=([^;]+)/);
  
  if (!sessionMatch) return false;
  
  const sessionToken = sessionMatch[1];
  const storedToken = await env.NAV_LINKS.get('_session_token');
  
  return sessionToken === storedToken;
}

// 创建会话
async function createSession(env) {
  const token = crypto.randomUUID();
  await env.NAV_LINKS.put('_session_token', token, { expirationTtl: 86400 }); // 24小时过期
  return token;
}

// 处理登录请求
async function handleLogin(request, env) {
  const contentType = request.headers.get('content-type');
  let body;
  
  if (contentType && contentType.includes('application/json')) {
    body = await request.json();
  } else {
    return new Response(JSON.stringify({
      success: false,
      message: '请提供JSON格式的请求体',
      error: 'INVALID_CONTENT_TYPE'
    }), { 
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  if (!body || !body.password) {
    return new Response(JSON.stringify({
      success: false,
      message: '请提供密码',
      error: 'MISSING_PASSWORD'
    }), { 
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  if (body.password !== env.AUTH_PASSWORD) {
    return new Response(JSON.stringify({
      success: false,
      message: '密码错误',
      error: 'INVALID_PASSWORD'
    }), { 
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  const sessionToken = await createSession(env);
  
  return new Response(JSON.stringify({ success: true }), {
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': `session=${sessionToken}; HttpOnly; Path=/; Max-Age=86400; SameSite=Strict`
    }
  });
}

// 处理退出登录请求
async function handleLogout(env) {
  await env.NAV_LINKS.delete('_session_token');
  
  return new Response(JSON.stringify({ success: true }), {
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': 'session=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict'
    }
  });
}

// 添加导航链接
async function addNavLink(request, env) {
  const contentType = request.headers.get('content-type');
  let body;
  
  if (contentType && contentType.includes('application/json')) {
    body = await request.json();
  } else {
    return new Response('请提供JSON格式的请求体', { status: 400 });
  }
  
  if (!body || !body.title || !body.url) {
    return new Response('标题和URL是必填项', { status: 400 });
  }
  
  const id = Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  const key = `link:${id}`;
  
  await env.NAV_LINKS.put(key, JSON.stringify(body));
  
  return new Response(JSON.stringify({ id, ...body }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

// 更新导航链接
async function updateNavLink(request, env, id) {
  const contentType = request.headers.get('content-type');
  let body;
  
  if (contentType && contentType.includes('application/json')) {
    body = await request.json();
  } else {
    return new Response('请提供JSON格式的请求体', { status: 400 });
  }
  
  if (!body || !body.title || !body.url) {
    return new Response('标题和URL是必填项', { status: 400 });
  }
  
  const key = `link:${id}`;
  const existing = await env.NAV_LINKS.get(key);
  
  if (!existing) {
    return new Response('导航链接不存在', { status: 404 });
  }
  
  await env.NAV_LINKS.put(key, JSON.stringify(body));
  
  return new Response(JSON.stringify({ id, ...body }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

// 删除导航链接
async function deleteNavLink(env, id) {
  const key = `link:${id}`;
  const existing = await env.NAV_LINKS.get(key);
  
  if (!existing) {
    return new Response('导航链接不存在', { status: 404 });
  }
  
  await env.NAV_LINKS.delete(key);
  
  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

// 添加公告
async function addAnnouncement(request, env) {
  const contentType = request.headers.get('content-type');
  let body;
  
  if (contentType && contentType.includes('application/json')) {
    body = await request.json();
  } else {
    return new Response('请提供JSON格式的请求体', { status: 400 });
  }
  
  if (!body || !body.title || !body.content) {
    return new Response('标题和内容是必填项', { status: 400 });
  }
  
  // 使用自定义ID或生成随机ID
  const id = body.id || Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  const key = `announcement:${id}`;
  
  // 检查ID是否已存在
  if (body.id) {
    const existing = await env.NAV_LINKS.get(key);
    if (existing) {
      return new Response('该ID已存在', { status: 400 });
    }
  }
  
  // 构建公告对象
  const announcement = {
    title: body.title,
    content: body.content,
    icon: body.icon || 'fa-bullhorn',
    createdAt: Date.now()
  };
  
  await env.NAV_LINKS.put(key, JSON.stringify(announcement));
  
  return new Response(JSON.stringify({ id, ...announcement }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

// 更新公告
async function updateAnnouncement(request, env, id) {
  const contentType = request.headers.get('content-type');
  let body;
  
  if (contentType && contentType.includes('application/json')) {
    body = await request.json();
  } else {
    return new Response('请提供JSON格式的请求体', { status: 400 });
  }
  
  if (!body || !body.title || !body.content) {
    return new Response('标题和内容是必填项', { status: 400 });
  }
  
  const key = `announcement:${id}`;
  const existing = await env.NAV_LINKS.get(key);
  
  if (!existing) {
    return new Response('公告不存在', { status: 404 });
  }
  
  // 构建更新后的公告对象
  const existingData = JSON.parse(existing);
  const announcement = {
    title: body.title,
    content: body.content,
    icon: body.icon || existingData.icon || 'fa-bullhorn',
    createdAt: existingData.createdAt || Date.now(),
    updatedAt: Date.now()
  };
  
  await env.NAV_LINKS.put(key, JSON.stringify(announcement));
  
  return new Response(JSON.stringify({ id, ...announcement }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

// 删除公告
async function deleteAnnouncement(env, id) {
  const key = `announcement:${id}`;
  const existing = await env.NAV_LINKS.get(key);
  
  if (!existing) {
    return new Response('公告不存在', { status: 404 });
  }
  
  await env.NAV_LINKS.delete(key);
  
  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

// 主处理函数
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;
    
    // 处理导航页面请求
    if (path === '/') {
      // 验证会话
      const isAuthenticated = await validateSession(request, env);
      if (!isAuthenticated) {
        return Response.redirect(`${url.origin}/login`, 302);
      }
      return new Response(NAV_HTML, {
        headers: { 'Content-Type': 'text/html' }
      });
    }
    
    // 处理登录页面请求
    if (path === '/login') {
      return new Response(LOGIN_HTML, {
        headers: { 'Content-Type': 'text/html' }
      });
    }
    
    // 处理管理页面请求
    if (path === '/admin') {
      // 验证会话
      const isAuthenticated = await validateSession(request, env);
      if (!isAuthenticated) {
        return Response.redirect(`${url.origin}/login`, 302);
      }
      
      return new Response(ADMIN_HTML, {
        headers: { 'Content-Type': 'text/html' }
      });
    }
    
    // 处理API请求
    if (path.startsWith('/api/')) {
      // 登录API - 无需验证
      if (path === '/api/login' && method === 'POST') {
        return handleLogin(request, env);
      }
      
      // 对外API接口 - 使用API_KEY验证
      if (path.startsWith('/api/external/')) {
        // 验证API密钥
        const apiKey = request.headers.get('X-API-Key');
        if (!apiKey || apiKey !== env.API_KEY) {
          return new Response(JSON.stringify({
            success: false,
            message: 'API密钥无效',
            error: 'INVALID_API_KEY'
          }), { 
            status: 401,
            headers: { 'Content-Type': 'application/json' }
          });
        }
        
        // 对外新增/更新导航链接
        if (path === '/api/external/links' && (method === 'POST' || method === 'PUT')) {
          return handleExternalNavLink(request, env);
        }
        
        // 对外新增/更新公告
        if (path === '/api/external/announcements' && (method === 'POST' || method === 'PUT')) {
          return handleExternalAnnouncement(request, env);
        }
      }
      
      // 除登录和对外API外的所有API都需要验证会话
      const isAuthenticated = await validateSession(request, env);
      if (!isAuthenticated) {
        return new Response(JSON.stringify({
          success: false,
          message: '未授权',
          error: 'UNAUTHORIZED'
        }), { 
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      // 退出登录API
      if (path === '/api/logout' && method === 'POST') {
        return handleLogout(env);
      }
      
      // 获取导航链接
      if (path === '/api/links' && method === 'GET') {
        const links = await getNavLinks(env);
        return new Response(JSON.stringify(links), {
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      // 获取公告
      if (path === '/api/announcements' && method === 'GET') {
        const announcements = await getAnnouncements(env);
        return new Response(JSON.stringify(announcements), {
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      // 添加导航链接
      if (path === '/api/links' && method === 'POST') {
        return addNavLink(request, env);
      }
      
      // 添加公告
      if (path === '/api/announcements' && method === 'POST') {
        return addAnnouncement(request, env);
      }
      
      // 更新或删除导航链接
      const linkMatch = path.match(/\/api\/links\/(.+)/);
      if (linkMatch) {
        const id = linkMatch[1];
        
        if (method === 'PUT') {
          return updateNavLink(request, env, id);
        }
        
        if (method === 'DELETE') {
          return deleteNavLink(env, id);
        }
      }
      
      // 更新或删除公告
      const announcementMatch = path.match(/\/api\/announcements\/(.+)/);
      if (announcementMatch) {
        const id = announcementMatch[1];
        
        if (method === 'PUT') {
          return updateAnnouncement(request, env, id);
        }
        
        if (method === 'DELETE') {
          return deleteAnnouncement(env, id);
        }
      }
    }
    
    return new Response(JSON.stringify({
      success: false,
      message: '未找到请求的资源',
      error: 'NOT_FOUND'
    }), { 
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// 处理对外API导航链接请求
async function handleExternalNavLink(request, env) {
  const contentType = request.headers.get('content-type');
  let body;
  
  if (contentType && contentType.includes('application/json')) {
    body = await request.json();
  } else {
    return new Response(JSON.stringify({
      success: false,
      message: '请提供JSON格式的请求体',
      error: 'INVALID_CONTENT_TYPE'
    }), { 
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  if (!body || !body.title || !body.url) {
    return new Response(JSON.stringify({
      success: false,
      message: '标题和URL是必填项',
      error: 'MISSING_REQUIRED_FIELDS'
    }), { 
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  // 如果提供了ID，则更新现有链接，否则创建新链接
  if (body.id) {
    const key = `link:${body.id}`;
    const existing = await env.NAV_LINKS.get(key);
    
    if (!existing) {
      return new Response(JSON.stringify({
      success: false,
      message: '导航链接不存在',
      error: 'NOT_FOUND'
    }), { 
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });
    }
    
    await env.NAV_LINKS.put(key, JSON.stringify(body));
    
    return new Response(JSON.stringify({
      success: true,
      message: '导航链接已更新',
      data: { id: body.id, ...body }
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } else {
    // 创建新链接
    const id = Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
    const key = `link:${id}`;
    
    await env.NAV_LINKS.put(key, JSON.stringify(body));
    
    return new Response(JSON.stringify({
      success: true,
      message: '导航链接已保存',
      data: { id, ...body }
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// 处理对外API公告请求
async function handleExternalAnnouncement(request, env) {
  const contentType = request.headers.get('content-type');
  let body;
  
  if (contentType && contentType.includes('application/json')) {
    body = await request.json();
  } else {
    return new Response(JSON.stringify({
      success: false,
      message: '请提供JSON格式的请求体',
      error: 'INVALID_CONTENT_TYPE'
    }), { 
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  if (!body || !body.title || !body.content) {
    return new Response(JSON.stringify({
      success: false,
      message: '标题和内容是必填项',
      error: 'MISSING_REQUIRED_FIELDS'
    }), { 
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  // 如果提供了ID，则更新现有公告，否则创建新公告
  if (body.id) {
    const key = `announcement:${body.id}`;
    const existing = await env.NAV_LINKS.get(key);
    
    if (!existing) {
      return new Response(JSON.stringify({
      success: false,
      message: '公告不存在',
      error: 'NOT_FOUND'
    }), { 
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });
    }
    
    // 构建公告对象，保留原创建时间
    const existingData = JSON.parse(existing);
    const announcement = {
      title: body.title,
      content: body.content,
      icon: body.icon || existingData.icon || 'fa-bullhorn',
      createdAt: existingData.createdAt
    };
    
    await env.NAV_LINKS.put(key, JSON.stringify(announcement));
    
    return new Response(JSON.stringify({
      success: true,
      message: '公告已更新',
      data: { id: body.id, ...announcement }
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } else {
    // 创建新公告
    const id = Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
    const key = `announcement:${id}`;
    
    // 构建公告对象
    const announcement = {
      title: body.title,
      content: body.content,
      icon: body.icon || 'fa-bullhorn',
      createdAt: Date.now()
    };
    
    await env.NAV_LINKS.put(key, JSON.stringify(announcement));
    
    return new Response(JSON.stringify({
      success: true,
      message: '公告已保存',
      data: { id, ...announcement }
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
