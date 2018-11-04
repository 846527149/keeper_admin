<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.title"
        placeholder="搜索商品名称"
        prefix-icon="el-icon-search"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button plain @click="open3">成功</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border=""
      fit
      stripe
      highlight-current-row
    >
      <el-table-column fixed label="序号" width="60" align="center">
        <template slot-scope="scope">
          <span>{{ scope.$index+(listQuery.page - 1) * listQuery.limit + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="分类名称">
        <template slot-scope="scope">{{ scope.row.CategoryName }}</template>
      </el-table-column>
      <el-table-column label="门店名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.NickName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" align="center">
        <template slot-scope="scope">{{ scope.row.GoodsName }}</template>
      </el-table-column>
      <el-table-column label="商品地址" align="center" width="100">
        <template slot-scope="scope">
          <span class="link-type" @click="showUrl(scope.row.ExpandLink)">查看</span>
        </template>
      </el-table-column>
      <el-table-column label="原价" align="center" sortable width="100">
        <template slot-scope="scope">{{ scope.row.Price }}</template>
      </el-table-column>
      <el-table-column label="返现比率" align="center" width="100">
        <template slot-scope="scope">{{ scope.row.Ratio }}</template>
      </el-table-column>
      <el-table-column label="优惠券" align="center" width="100">
        <template slot-scope="scope">{{ scope.row.Coupons }}</template>
      </el-table-column>
      <el-table-column label="成交价" align="center" width="100">
        <template slot-scope="scope">{{ scope.row.Price1 }}</template>
      </el-table-column>
      <el-table-column label="领券地址" align="center" width="100">
        <template slot-scope="scope">
          <span class="link-type" @click="showUrl(scope.row.Coupons_Link)">查看</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination
        v-show="total>0"
        :current-page="listQuery.page"
        :page-sizes="[15,30,50, 100]"
        :page-size="listQuery.limit"
        :total="total"
        background=""
        layout=" total,prev, pager, next, jumper,sizes "
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import { aliGoodsPagedList } from '@/api/alimama'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      total: null,
      listQuery: {
        page: 1,
        limit: 15,
        title: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      aliGoodsPagedList(this.listQuery).then(response => {
        var data = response.data.Data
        this.list = data.Items
        this.total = data.Total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.fetchData()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.fetchData()
    },
    showUrl(url) {
      window.open(url)
    }
  }
}
</script>
