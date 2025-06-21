<template>
  <header>
    <nav class="navbar navbar-light">
      <div class="container">
        <RouterLink class="navbar-brand" to="/">conduit</RouterLink>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <!-- Add "active" class when you're on that page" -->
            <RouterLink class="nav-link active" to="/">Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/login">Sign in</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/register">Sign up</RouterLink>
          </li>
        </ul>
      </div>
    </nav>
  </header>
  <main>
    <RouterView />
  </main>
  <footer>
    <div class="container">
      <a href="/" class="logo-font">conduit</a>
      <span class="attribution">
        An interactive learning project from
        <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed
        under MIT.
      </span>
    </div>
  </footer>
</template>
