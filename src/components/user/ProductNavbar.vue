<template>
  <div class="container">
    <ul
      class="category list-unstyled d-flex justify-content-center mt-4"
      style="margin-bottom: 50px"
    >
      <li class="btn btn-outline-secondary p-0 ms-1" :class="isActive === 'all' ? 'active' : ''">
        <RouterLink class="router-link-active active px-3 px-md-4 py-1" to="/products/all"
          >全部</RouterLink
        >
      </li>
      <li class="btn btn-outline-secondary p-0 ms-1" :class="isActive === '旅遊' ? 'active' : ''">
        <RouterLink class="router-link-active active px-3 px-md-4 py-1" to="/products/旅遊"
          >旅遊</RouterLink
        >
      </li>
      <li class="btn btn-outline-secondary p-0 ms-1" :class="isActive === '蔬果' ? 'active' : ''">
        <RouterLink class="router-link-active active px-3 px-md-4 py-1" to="/products/蔬果"
          >蔬果</RouterLink
        >
      </li>
      <li class="btn btn-outline-secondary p-0 ms-1" :class="isActive === '肉品' ? 'active' : ''">
        <RouterLink class="router-link-active active px-3 px-md-4 py-1" to="/products/肉品"
          >肉品</RouterLink
        >
      </li>
      <!-- <li class="list-group-item btn btn-outline-primary p-0">
            <RouterLink class="router-link-active active px-3 px-md-4 py-1" to="/products/吐司">吐司</RouterLink>
          </li>
          <li class="list-group-item btn btn-outline-primary p-0">
            <RouterLink class="router-link-active active px-3 px-md-4 py-1" to="/products/漢堡">漢堡</RouterLink>
          </li>
          <li class="list-group-item btn btn-outline-primary p-0">
            <RouterLink class="router-link-active active px-3 px-md-4 py-1" to="/products/蛋餅">蛋餅</RouterLink>
          </li>
          <li class="list-group-item btn btn-outline-primary p-0">
            <RouterLink class="router-link-active active px-3 px-md-4 py-1" to="/products/飲品">飲品</RouterLink>
          </li> -->
    </ul>
  </div>
</template>
    
<script>
export default {
  props: ['isActive'],
  // data() {
  // },
  methods: {}
}
</script>
    