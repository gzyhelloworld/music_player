<template>
  <div class="top">
<nav class="navbar navbar-default" role="navigation" style="border-radius:0;">
  <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand" href="#">尽享音乐</a>
    </div>
    <ul class="nav navbar-nav navbar-right">
      <li><a href="#"><span class="glyphicon glyphicon-user"></span> 注册</a></li>
      <li><a href="#"><span class="glyphicon glyphicon-log-in"></span> 登录</a></li>
    </ul>
  </div>
</nav>
  </div>
</template>

<script>
export default {
  name: 'top',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbar-default .navbar-brand {
  color:#06e;
}
.navbar-default .navbar-nav>li>a {
  color:#06e;
}
</style>
