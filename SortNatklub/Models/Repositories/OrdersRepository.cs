using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace SortNatklub.Models.Repositories
{
    public class OrdersRepository
    {
        public Order PlaceOrder(Order order)
        {
            try
            {
                //order.Calculate();
                using (SqlConnection sql = new SqlConnection(Config.ConnectionString("umbracoDbDSN")))
                {
                    sql.Open();
                    using (SqlCommand cmd = sql.CreateCommand())
                    {
                        cmd.CommandText = "INSERT INTO OrderDetails([name], [mail], [phone], [guests], [date], [message], [orderTotal]) VALUES(@name, @mail, @phone, @guests, @date, @message, @orderTotal); SELECT SCOPE_IDENTITY();";
                        cmd.Parameters.AddWithValue("@name", order.Name);
                        cmd.Parameters.AddWithValue("@mail", order.Mail);
                        cmd.Parameters.AddWithValue("@phone", order.Phone);
                        cmd.Parameters.AddWithValue("@guests", order.Guests);
                        cmd.Parameters.AddWithValue("@date", order.Date);
                        cmd.Parameters.AddWithValue("@message", order.Message);
                        cmd.Parameters.AddWithValue("@orderTotal", order.Total);

                        order.Id = Convert.ToInt32(cmd.ExecuteScalar().ToString());
                    }

                    using (SqlCommand cmd = sql.CreateCommand())
                    {
                        cmd.CommandText = "INSERT INTO OrderProducts([productName], [productQuantity], [productPrice], [orderId]) VALUES(@name, @quantity, @price, @orderId)";
                        foreach (OrderItem product in order.Products)
                        {
                            cmd.Parameters.Clear();
                            cmd.Parameters.AddWithValue("@name", product.ProductName);
                            cmd.Parameters.AddWithValue("@quantity", product.ProductQuantity);
                            cmd.Parameters.AddWithValue("@price", product.ProductPrice);
                            cmd.Parameters.AddWithValue("@orderId", order.Id);
                            cmd.ExecuteNonQuery();
                        }
                    }
                    sql.Close();
                    return GetOrder(order.Id);
                }
            }
            catch (Exception e)
            {
                return null;
            }
            
        }

        public Order GetOrder(int id)
        {
            Order order = new Order();
            try
            {
                using (SqlConnection sql = new SqlConnection(Config.ConnectionString("umbracoDbDSN")))
                {
                    sql.Open();
                    using (SqlCommand cmd = sql.CreateCommand())
                    {
                        cmd.CommandText = "SELECT * FROM OrderDetails WHERE Id = @Id";
                        cmd.Parameters.AddWithValue("@Id", id);

                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            if (reader.Read())
                            {
                                order.Id = id;
                                order.Name = reader.GetString(reader.GetOrdinal("name"));
                                order.Mail = reader.GetString(reader.GetOrdinal("mail"));
                                order.Phone = reader.GetString(reader.GetOrdinal("phone"));
                                order.Guests = reader.GetInt32(reader.GetOrdinal("guests"));
                                order.Date = reader.GetDateTime(reader.GetOrdinal("date"));
                                order.Message = reader.GetString(reader.GetOrdinal("message"));
                                order.Total = reader.GetString(reader.GetOrdinal("orderTotal"));
                                order.Products = new List<OrderItem>();
                            }
                        }
                    }

                    using (SqlCommand cmd = sql.CreateCommand())
                    {
                        cmd.CommandText = "SELECT * FROM OrderProducts WHERE orderId = @Id";
                        cmd.Parameters.AddWithValue("@Id", id);

                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                OrderItem product = new OrderItem();
                                product.ProductName = reader.GetString(reader.GetOrdinal("productName"));
                                product.ProductQuantity = reader.GetInt32(reader.GetOrdinal("productQuantity"));
                                product.ProductPrice = reader.GetString(reader.GetOrdinal("productPrice"));
                                order.Products.Add(product);
                            }
                        }
                    }

                    sql.Close();
                }

                return order;
            }
            catch (Exception e)
            {
                return null;
            }
        } 
    }
}