﻿// <auto-generated />
using System;
using DAL.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace DAL.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    [Migration("20190808085942_AddDisplayNameToUser")]
    partial class AddDisplayNameToUser
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.4-servicing-10062")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("DAL.Models.Author", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTimeOffset>("CreatedTime");

                    b.Property<int>("EntityStatus");

                    b.Property<string>("Name");

                    b.Property<DateTimeOffset>("UpdatedTime");

                    b.HasKey("Id");

                    b.ToTable("Author");
                });

            modelBuilder.Entity("DAL.Models.Book", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid>("AuthorId");

                    b.Property<string>("BookCoverUrl");

                    b.Property<Guid>("CategoryId");

                    b.Property<DateTimeOffset>("CreatedTime");

                    b.Property<string>("Description");

                    b.Property<int>("EntityStatus");

                    b.Property<int>("LikedCount");

                    b.Property<string>("Name");

                    b.Property<Guid>("OwnerId");

                    b.Property<int>("ReadCount");

                    b.Property<DateTimeOffset>("UpdatedTime");

                    b.HasKey("Id");

                    b.HasIndex("AuthorId");

                    b.HasIndex("CategoryId");

                    b.HasIndex("OwnerId");

                    b.ToTable("Book");
                });

            modelBuilder.Entity("DAL.Models.BookSelf", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid?>("BookId");

                    b.Property<DateTimeOffset>("CreatedTime");

                    b.Property<int>("EntityStatus");

                    b.Property<string>("LastChapterUrl");

                    b.Property<DateTimeOffset>("UpdatedTime");

                    b.Property<Guid>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("BookId");

                    b.HasIndex("UserId");

                    b.ToTable("BookSelf");
                });

            modelBuilder.Entity("DAL.Models.Category", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTimeOffset>("CreatedTime");

                    b.Property<int>("EntityStatus");

                    b.Property<string>("Name");

                    b.Property<DateTimeOffset>("UpdatedTime");

                    b.HasKey("Id");

                    b.ToTable("Category");
                });

            modelBuilder.Entity("DAL.Models.Chapter", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid>("BookId");

                    b.Property<string>("Content");

                    b.Property<DateTimeOffset>("CreatedTime");

                    b.Property<int>("EntityStatus");

                    b.Property<string>("Name");

                    b.Property<DateTimeOffset>("UpdatedTime");

                    b.HasKey("Id");

                    b.HasIndex("BookId");

                    b.ToTable("Chapter");
                });

            modelBuilder.Entity("DAL.Models.Comment", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid?>("BookId");

                    b.Property<DateTimeOffset>("CreatedTime");

                    b.Property<int>("EntityStatus");

                    b.Property<string>("Message");

                    b.Property<DateTimeOffset>("UpdatedTime");

                    b.Property<Guid>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("BookId");

                    b.HasIndex("UserId");

                    b.ToTable("Comment");
                });

            modelBuilder.Entity("DAL.Models.Rate", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid?>("BookId");

                    b.Property<DateTimeOffset>("CreatedTime");

                    b.Property<int>("EntityStatus");

                    b.Property<string>("Message");

                    b.Property<int>("RatePoint");

                    b.Property<DateTimeOffset>("UpdatedTime");

                    b.Property<Guid>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("BookId");

                    b.HasIndex("UserId");

                    b.ToTable("Rate");
                });

            modelBuilder.Entity("DAL.Models.Role", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTimeOffset>("CreatedTime");

                    b.Property<int>("EntityStatus");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.Property<DateTimeOffset>("UpdatedTime");

                    b.HasKey("Id");

                    b.ToTable("Role");
                });

            modelBuilder.Entity("DAL.Models.Subscribe", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid?>("BookId");

                    b.Property<DateTimeOffset>("CreatedTime");

                    b.Property<int>("EntityStatus");

                    b.Property<DateTimeOffset>("UpdatedTime");

                    b.Property<Guid>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("BookId");

                    b.HasIndex("UserId");

                    b.ToTable("Subscribe");
                });

            modelBuilder.Entity("DAL.Models.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTimeOffset?>("AllowTokensSince");

                    b.Property<string>("AvatarUrl");

                    b.Property<DateTimeOffset>("CreatedTime");

                    b.Property<string>("DisplayName")
                        .IsRequired();

                    b.Property<string>("Email")
                        .IsRequired();

                    b.Property<int>("EntityStatus");

                    b.Property<byte[]>("PasswordHash")
                        .IsRequired();

                    b.Property<byte[]>("PasswordSalt")
                        .IsRequired();

                    b.Property<DateTimeOffset>("UpdatedTime");

                    b.HasKey("Id");

                    b.ToTable("User");
                });

            modelBuilder.Entity("DAL.Models.UserRole", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTimeOffset>("CreatedTime");

                    b.Property<int>("EntityStatus");

                    b.Property<Guid>("RoleId");

                    b.Property<DateTimeOffset>("UpdatedTime");

                    b.Property<Guid>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.HasIndex("UserId");

                    b.ToTable("UserRole");
                });

            modelBuilder.Entity("DAL.Models.Book", b =>
                {
                    b.HasOne("DAL.Models.Author", "Author")
                        .WithMany("Books")
                        .HasForeignKey("AuthorId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("DAL.Models.Category", "Category")
                        .WithMany("Books")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("DAL.Models.User", "Owner")
                        .WithMany("Books")
                        .HasForeignKey("OwnerId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("DAL.Models.BookSelf", b =>
                {
                    b.HasOne("DAL.Models.Book", "Book")
                        .WithMany("BookSelves")
                        .HasForeignKey("BookId");

                    b.HasOne("DAL.Models.User", "User")
                        .WithMany("BookSelves")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("DAL.Models.Chapter", b =>
                {
                    b.HasOne("DAL.Models.Book", "Book")
                        .WithMany("Chapters")
                        .HasForeignKey("BookId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("DAL.Models.Comment", b =>
                {
                    b.HasOne("DAL.Models.Book", "Book")
                        .WithMany("Comments")
                        .HasForeignKey("BookId");

                    b.HasOne("DAL.Models.User", "User")
                        .WithMany("Comments")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("DAL.Models.Rate", b =>
                {
                    b.HasOne("DAL.Models.Book", "Book")
                        .WithMany("Rates")
                        .HasForeignKey("BookId");

                    b.HasOne("DAL.Models.User", "User")
                        .WithMany("Rates")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("DAL.Models.Subscribe", b =>
                {
                    b.HasOne("DAL.Models.Book", "Book")
                        .WithMany("Subscribes")
                        .HasForeignKey("BookId");

                    b.HasOne("DAL.Models.User", "User")
                        .WithMany("Subscribes")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("DAL.Models.UserRole", b =>
                {
                    b.HasOne("DAL.Models.Role", "Role")
                        .WithMany("UserRoles")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("DAL.Models.User", "User")
                        .WithMany("UserRoles")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
